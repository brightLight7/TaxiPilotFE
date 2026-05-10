import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { GoogleMapInfo } from '../../model/google-map-api.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class GoogleMapService {
  baseUrl: string;
  baseUrl_GoogleMapAPI: string;
  htmlBody: string | undefined;

  constructor(private http: HttpClient) {
    this.baseUrl = CONSTANTS.BASE_URL;
    this.baseUrl_GoogleMapAPI = `${this.baseUrl}api/GoogleMapAPI/`;

    //this.baseUrl = "https://googlemapapi.pisquare360.com/";
  }

  getApiKey(): Observable<string> {
    const url = `${this.baseUrl_GoogleMapAPI}getApiKey`;
    const data = this.http.get<string>(url);
    return data.pipe(catchError(this.handleError));
  }

  getGoogleMapInfo(
    apCharges: string,
    radiusDistance: string,
    pickupDateTime: string,
    driverlocation: string,
    pickup: string,
    dest: string
  ): Observable<GoogleMapInfo> {
    const url = `${this.baseUrl_GoogleMapAPI}getRouteInfo/${apCharges}/${radiusDistance}/${pickupDateTime}/${driverlocation}/${pickup}?dest=${dest}`;
    const data = this.http.get<GoogleMapInfo>(url);
    return data.pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
