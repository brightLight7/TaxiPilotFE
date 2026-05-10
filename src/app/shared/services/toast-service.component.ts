import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: { message: string; type: string }[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toasts.push({ message, type });

    setTimeout(() => {
      this.toasts.shift(); // Remove toast after 3 seconds
    }, 300000);
  }
}
