import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private zone: NgZone) {}

  getCurrentLocation(): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.zone.run(() => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            });
          },
          (error) => {
            reject(error);
          },
          { timeout: 10000 } // Optional timeout
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
}
