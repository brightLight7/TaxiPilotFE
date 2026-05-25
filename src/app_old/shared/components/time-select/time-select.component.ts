import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppFacade } from 'src/app/store/app.facade';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss'],
})
export class TimeSelectComponent implements OnInit {

@Output() timeSelectedEmit = new EventEmitter<string>();
@Input() timeFromControl: string | undefined;

timeOptions: string[] = [];
timeSelected: string | undefined;
timeControl = new FormControl('00:00 AM');

  constructor(private appFacade: AppFacade) {
    this.generateTimeOptions();
  }
  ngOnInit(): void {
    this.appFacade.timePickup$.subscribe((t) => {
      if (t !== ''){
        this.timeSelected = t
        this.timeControl = new FormControl(t);
      }
    })
  }

  generateTimeOptions(): void {
    const periods = ["AM", "PM"];

    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        const period = hour < 12 ? periods[0] : periods[1];
        const displayHour = hour.toString().padStart(2, "0");
        const displayMinutes = minutes.toString().padStart(2, "0");
        const time = `${displayHour}:${displayMinutes} ${period}`;

        this.timeOptions.push(time);
      }
    }
  }

  onTimeWheel(event: any): void {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    this.timeSelected = input.value;

    this.timeSelectedEmit.emit(currentValue);

    if (currentValue) {
      let [hours, minutes] = currentValue.split(':').map(Number);

      hours++;
      hours--;

      minutes = Math.round(minutes / 5) * 5;
      const newTime = `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      input.value = newTime;
      event.preventDefault();
    }
  }

  trackByIndex(index: number, item: string): number {
  return index;
}
}
