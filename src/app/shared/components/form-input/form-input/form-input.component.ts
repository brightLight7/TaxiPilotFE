import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements AfterViewInit {
  @ViewChild('spanContainer') spanContainer!: ElementRef;
  @ViewChild('formInput') formInput!: ElementRef;
  @ViewChild('deleteCross') deleteCross!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Set background color efficiently
    this.renderer.setStyle(this.formInput.nativeElement, 'backgroundColor', this.bgColor);

    // Hide delete button initially
    this.renderer.setStyle(this.deleteCross.nativeElement, 'visibility', 'hidden');

    // Apply flex direction
    if (this.flexDirection) {
      this.renderer.setStyle(this.spanContainer.nativeElement, 'flexDirection', this.flexDirection);
    }
  }

  // #region Inputs
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() name = '';
  @Input() class = '';
  @Input() placeholder = '';
  @Input() formControlName = '';
  @Input() bgColor = 'white';
  @Input() deleteButtonOn = true;
  @Input() flexDirection = '';
  @Input() mandatory = false;
  // #endregion

  crossClick() {
    this.formInput.nativeElement.value = '';
    this.formInput.nativeElement.focus();
  }

  inputChange() {
    const visibility = this.formInput.nativeElement.value ? 'visible' : 'hidden';
    this.renderer.setStyle(this.deleteCross.nativeElement, 'visibility', visibility);
  }
}
