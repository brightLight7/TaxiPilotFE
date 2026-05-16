import { Component } from '@angular/core';
import { ToastService } from '../shared/services/toast-service.component';

@Component({
  selector: 'app-toast-msg-popup',
  templateUrl: './toast-msg-popup.component.html',
  styleUrls: ['./toast-msg-popup.component.scss'],
})
export class ToastMsgPopupComponent {
  constructor(public toastService: ToastService) {}
}
