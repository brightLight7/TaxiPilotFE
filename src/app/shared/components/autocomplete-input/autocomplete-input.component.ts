import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { Appearance, Location } from '@angular-material-extensions/google-maps-autocomplete';

// import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { FormControl, FormGroup } from '@angular/forms';
import { CONSTANTS } from '../../constants/constants';



@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteInputComponent implements OnInit {
  appearance = Appearance;
  zoom: number | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  selectedAddress: PlaceResult | undefined;
  addressFormGroup: FormGroup | undefined;

  constructor(private titleService: Title) {

  }


  ngOnInit(): void {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();


    this.addressFormGroup = new FormGroup({
      address: new FormControl(),
    });

    this.addressFormGroup?.get('address')?.valueChanges.subscribe(value => console.log('value changed', value))
  }

  onAutocompleteSelected(event: PlaceResult) {
    //const allowedCountries = [CONSTANTS.REGION_GB]; // ISO 3166-1 alpha-2 codes for UK and Pakistan
    const allowedCountries = [CONSTANTS.REGION_PK]; // ISO 3166-1 alpha-2 codes for UK and Pakistan
    const addressComponents = event.address_components;

    if (addressComponents) {
      const countryComponent = addressComponents.find(component =>
        component.types.includes('country')
      );

      if (countryComponent && allowedCountries.includes(countryComponent.short_name)) {
        console.log('Autocomplete selected: ', event);
        this.selectedAddress = event; // Store the selected address
      } else {
        console.warn('Selected address is not in the allowed countries.');
        // Handle the case where the selected address is not in the allowed countries
      }
    }
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onLocationSelected(location: Location) {
    const allowedCountries = ['GB', CONSTANTS.REGION_GB];
    // const allowedCountries = ['GB', CONSTANTS.REGION_PK]; //TODO Pakistan
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat: location.latitude, lng: location.longitude } }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const countryComponent = results[0].address_components.find(component =>
          component.types.includes('country')
        );

        if (countryComponent && allowedCountries.includes(countryComponent.short_name)) {
          console.log('Location selected: ', location);
          this.selectedAddress = {
            geometry: {
              location: {
                lat: () => location.latitude,
                lng: () => location.longitude
              }
            }
          } as PlaceResult;
        } else {
          console.warn('Selected location is not in the allowed countries.');
          // Handle the case where the selected location is not in the allowed countries
        }
      }
    });



}
}
