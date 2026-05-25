import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleMapService } from '../googlemap.service';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private apiKey = 'AIzaSyDYNzPPFlA8FQbXfqERtDiOXaFJUVcW9GU';
  private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';


  reverseGeocode(lat: number, lng: number): Observable<any> {
    this.googleService.getApiKey().subscribe(
      key => this.apiKey = key
    );

    const url = `${this.geocodeUrl}?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  constructor(private http: HttpClient, private googleService: GoogleMapService) { }

}
