import { Injectable } from "@angular/core";
import { GeocodingService } from "./geocoding.service";
import { LocationService } from "./location.service";
@Injectable(
{
  providedIn: 'root',
})

export class PickupAddressService {
  // #region Initalizations
  //18 shelley road, HC
  // lat = 51.62364365615922;
  // lng = -0.7593047619639741;

  //gatwick s
  // lat = 51.156398;
  // lng = -0.159529;

  //gatwick n
  lat = 51.16114692747293;
  lng = -0.1750103684716973;


  street: any;
  area: any;
  pcode: any;
  address = '';
  error = '';
  // #endregion


  getLocation(): string {
    this.locationService.getCurrentLocation()
    .then((position) => {
      this.lat = this.lat == 0 ? position.lat : this.lat;
      this.lng = this.lng == 0 ? position.lng : this.lng;

      // Reverse geocoding to get street and area
      this.geocodingService.reverseGeocode(this.lat, this.lng).subscribe(
        (response) => {
          if (response.status === 'OK' && response.results.length > 0) {
            const addressComponents = response.results[0].address_components;

            // Extracting street and area from address components
            this.street = this.getComponent(addressComponents, 'route'); // 'route' represents the street
            this.area = this.getComponent(addressComponents, 'locality'); // 'locality' represents the city or area
            this.pcode = this.getComponent(addressComponents, 'postal_code'); // 'locality' represents the city or area
            this.address = `${this.street}, ${this.area}. ${this.pcode}`
            return this.address;
          } else {
            return `Geocoding failed: ${response.status}`;
          }
        },
        (error) => {
          return `Error: ${error.message}`;
        }
      );
    })
    .catch((error) => {
      return `Error getting location: ${error.message}`;
    });
    return this.address;
  }

  private getComponent(components: any[], type: string): string | undefined {
    const component = components.find((c: any) => c.types.includes(type));
    return component ? component.long_name : undefined;
  }

  // getLocationArea(lat: number, lng: number){
  //   this.geocodingService.reverseGeocode(lat, lng)
  //   .subscribe(
  //     (response) => {
  //       if (response.status === 'OK') {
  //         this.address = response.results[0]?.formatted_address;
  //       } else {
  //         this.error = `Geocoding failed: ${response.status}`;
  //       }
  //     },
  //     (error) => {
  //       this.error = `Error: ${error.message}`;
  //     }
  //   );
  // }

  constructor(private locationService: LocationService, private geocodingService: GeocodingService) {}
}
