import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppFacade } from '../store/app.facade';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnChanges {
  @Input() toastMessage: string = ''; // Message to display
  toastType: string = 'success'; // Toast type (success, error, warning, etc.)
  show: boolean = false; // Controls the visibility of the toast

  ngOnChanges(): void {
    this.show = false;
    if (this.toastMessage !== "" && this.toastMessage.indexOf('|') == -1) {
      this.toastType = "Alert";
      this.toastMessage = this.toastMessage;
      this.showToast();
    } else if (this.toastMessage !== "" && this.toastMessage.split('|').length > 1) {
      this.toastType = this.toastMessage.split('|')[0];
      this.toastMessage = this.toastMessage.split('|')[1];
      this.showToast();
    }
  }

  showToast(): void {
    this.show = true;
    setTimeout(() => {
      this.show = false;
      this.appFacade.setGlobalMsg('');
    }, 3000);
  }

  /**
   *
   */
  constructor(private appFacade: AppFacade ) {


  }
}
