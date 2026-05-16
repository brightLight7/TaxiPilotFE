import * as signalR from '@microsoft/signalr';
import { CONSTANTS } from '../constants/constants';

let connection: signalR.HubConnection | null = null;

export function initializeSignalR(): void {
  if (connection) return;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${CONSTANTS.BASE_URL}alerthub`)
    .withAutomaticReconnect()
    .build();

  connection.start().catch((err) => console.error('SignalR connection error:', err));
}

export function onSignalREvent(eventName: string, handler: (...args: unknown[]) => void): void {
  if (!connection) {
    console.warn('SignalR not initialized. Call initializeSignalR() first.');
    return;
  }
  connection.on(eventName, handler);
}

export function offSignalREvent(eventName: string, handler: (...args: unknown[]) => void): void {
  connection?.off(eventName, handler);
}

export function stopSignalR(): void {
  connection?.stop().catch((err) => console.error('Error stopping SignalR:', err));
  connection = null;
}
