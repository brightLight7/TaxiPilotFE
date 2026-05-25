import { Component, OnInit, AfterViewInit, NgZone, ElementRef, ViewChild, Input, Output, EventEmitter, forwardRef, PLATFORM_ID, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/store/root.interface';
import { AppFacade } from 'src/app/store/app.facade';
import { CONSTANTS } from '../../constants/constants';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})

export class AutocompleteComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() smTitle!: string;
  @Input() placeholder!: string;
  @Input() smLabel!: string;
  @Input() cssIcon!: string;
  @Input() pickupORdest!: string;
  @Input() Id!: string;
  @Input() value!: string;
  @Input() iconColor = 'gray';
  @Input() formControlName = '';


  @Output() addressEvent = new EventEmitter<string>();
  @Output() addressLatLong = new EventEmitter<string>();

  address: string | undefined;

  @ViewChild('autocompleteInput', { static: true }) autocompleteInput!: ElementRef;
  autocomplete!: google.maps.places.Autocomplete;
  form!: FormGroup;
  inputValue$!: Observable<string>;
  inputValue = 'Crawley';
  isDisabled = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: any) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};
  latitude = 51.154921645365945;
  longitude = -0.18199272053146207;

  // Implementing ControlValueAccessor methods
  writeValue(value: any): void {
    this.inputValue$ = value || '';
    if (this.autocompleteInput) {
      this.autocompleteInput.nativeElement.value = this.inputValue$;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.autocompleteInput) {
      this.autocompleteInput.nativeElement.disabled = isDisabled;
    }
  }

  ngOnInit(): void {

    //this.inputValue$ = this.store.select(pickupSelector);
    this.inputValue$ = this.appFacade.pickup$;


    this.inputValue$.subscribe((value) => {
      this.inputValue = value
    });

    // this.autocomplete.addListener('place_changed', () => {
    //   this.ngZone.run(() => {
    //     const place = this.autocomplete.getPlace();
    //     if (place && place.geometry && place.geometry.location) {
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.addressEvent.emit(place.formatted_address || '');
    //       this.addressLatLong.emit(`${this.latitude}|${this.longitude}`);
    //       this.appFacade.setPickUpDest(place.formatted_address || '');
    //       console.log(`Selected place: Latitude ${this.latitude}, Longitude ${this.longitude}`);
    //     }
    //   });
    // });

  }

  ngAfterViewInit(): void {
    // Ensure that Google Maps is only initialized in the browser, not on the server
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAutocomplete();
    }
  }

  initializeAutocomplete(): void {
    const input = this.autocompleteInput.nativeElement as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['establishment', 'geocode'],
      componentRestrictions: { country: CONSTANTS.REGION_GB },
      // componentRestrictions: { country: CONSTANTS.REGION_PK }, //TODO Pakistan
    });

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        this.addressSelected(place.formatted_address || ''); // Update address property
        this.onChange(place.formatted_address); // Notify Angular form
      });
    });
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object, private ngZone: NgZone, private store: Store<RootState>, private appFacade: AppFacade) {}

  addressSelected(_address: string | undefined) {
    this.onChange(this.address); // Notify Angular forms of the new value
    this.onTouched(); // Mark as touched
    this.addressEvent.emit(`${_address}`);
    // this.appFacade.setPickUpDest(_address?? '');

    const place = this.autocomplete.getPlace();

    if (place && place.geometry && place.geometry.location) {
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.addressEvent.emit(place.formatted_address || '');
      this.addressLatLong.emit(`${this.latitude}|${this.longitude}`);
      //this.appFacade.setPickUpDest(place.formatted_address || '');
      console.log(`Selected place: Latitude ${this.latitude}, Longitude ${this.longitude}`);
    }
  }


}
