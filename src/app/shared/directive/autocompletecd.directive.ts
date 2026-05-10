import { Directive, ElementRef, Input, AfterViewInit, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appAutocompletecd]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteDirective,
      multi: true
    }
  ]
})
export class AutocompleteDirective implements AfterViewInit, ControlValueAccessor {
  @Input() country = 'UK';

  autocomplete!: google.maps.places.Autocomplete;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private el: ElementRef, private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.initializeAutocomplete();
  }

  initializeAutocomplete(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode'],
      componentRestrictions: { country: this.country }
    });

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.error('No details available for input: ' + place.name);
          return;
        }
        this.onChange(place.formatted_address || '');
        this.onTouched();
      });
    });
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
