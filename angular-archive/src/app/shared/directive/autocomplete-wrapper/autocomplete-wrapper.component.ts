import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete-wrapper',
  templateUrl: './autocomplete-wrapper.component.html',
  styleUrls: ['./autocomplete-wrapper.component.scss']
})
export class AutocompleteWrapperComponent {
  @Input() smTitle!: string;
  @Input() placeholder!: string;
  @Input() smLabel!: string;
  @Input() cssIcon!: string;
  @Input() formControlName2!: string;
  @Input() country = 'UK';
}
