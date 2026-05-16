import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sm-input',
  templateUrl: './sm-input.component.html',
  styleUrls: ['./sm-input.component.scss']
})
export class SmInputComponent {
  @Input() smTitle: string | undefined;
  @Input() smInputLabel = "";
  @Input() cssIcon = "planeTakeOff"
  @Input() placeholder: string | undefined;

}
