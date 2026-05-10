import { CONSTANTS } from 'src/app/shared/constants/constants';
import { environment } from '../../../../src/environments/environment';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root', // Ensures the service is a singleton
})
export class SignalRService {
  private connection!: signalR.HubConnection;
  baseUrl: string = environment.BASE_URL;

  // Initialize the SignalR connection
  initializeConnection(): void {
    if (this.connection) {
      console.log('SignalR connection is already initialized');
      return;
    }
    // this.baseUrl = CONSTANTS.BASE_URL;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}alerthub`) // Ensure this matches your backend URL
      .build();

    this.connection
      .start()
      .then(() => {
        console.log('SignalR connection established');
      })
      .catch((err) => {
        console.error('SignalR connection error:', err);
      });
  }

  // Register an event handler
  on(eventName: string, handler: (...args: any[]) => void): void {
    if (!this.connection) {
      console.error('SignalR connection not initialized');
      return;
    }

    this.connection.on(eventName, handler);
  }

  // Stop the connection
  stopConnection(): void {
    if (this.connection) {
      this.connection
        .stop()
        .then(() => {
          console.log('SignalR connection stopped');
        })
        .catch((err) => {
          console.error('Error stopping SignalR connection:', err);
        });
    }
  }

  constructor() {
    // this.baseUrl = CONSTANTS.BASE_URL
  }
}
