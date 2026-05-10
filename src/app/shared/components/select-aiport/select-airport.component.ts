import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppFacade } from 'src/app/store/app.facade';
import { RootState } from 'src/app/store/root.interface';

@Component({
  selector: 'app-select-airport',
  templateUrl: './select-airport.component.html',
  styleUrls: ['./select-airport.component.scss']
})
export class SelectAirportComponent implements OnInit {
  selectedLocationName = '';

  @Input() formControlName: string | undefined;
  @Input() Id = 'pick-up';
  @Input() value = ""
  @Input() iconName = "planeLand"
  @Input() iconColor = "red"
  @Input() airport = ""

  @Output() airportSelectedChild = new EventEmitter<string>();
  airportSelected = new FormControl('');
  selectedLocation!: { name: string; latitude: number; longitude: number };


  locations = [
    { name: 'Gatwick Airport South Terminal', latitude: 51.1562, longitude: -0.1821 },
    { name: 'Gatwick Airport North Terminal', latitude: 51.1614, longitude: -0.1784 },
    // Add additional locations if needed
  ];

  ngOnInit(): void {
    this.appFacade.airport$.subscribe(
      (x) =>{
        if(x !== ''){
        this.airportSelected = new FormControl(x)
        }
      }
    );
  }

  onSelectionChange(event: any) {
    if (event.target.value) {
    this.airportSelectedChild.emit(event.target.value);
    const location = this.locations.find(x => x.name === event.target.value);
    const adr = 'pickup';
    const lat = location?.latitude;
    const lon = location?.longitude;

    if(lat && lon){
    const placesArray = { addr: adr, latitude: lat, longitude: lon };
    this.appFacade.setPlacesArray(placesArray);
    }

    this.appFacade.setAirport(`${event.target.value}`);

    }
  }

  constructor(private fb: FormBuilder, private store: Store<RootState>, private appFacade: AppFacade) {}

}
