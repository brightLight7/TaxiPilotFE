import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBoxFancy]'
})
export class BoxFancyDirective implements OnInit {
  @Input() borderLeftWidth: string | undefined;
  @Input() borderLeftColor: string | undefined;
  @Input() borderColor: string | undefined;
  @Input() borderWidth: string | undefined;

  @Input() shadow: string | undefined;

  constructor(private ef: ElementRef) {}

  ngOnInit() {
    this.ef.nativeElement.style.border = `${this.borderWidth} solid ${this.borderColor}`;
    this.ef.nativeElement.style.borderLeft = `${this.borderLeftWidth} solid ${this.borderLeftColor}`;
    this.ef.nativeElement.style.boxShadow = this.shadow;
  }
}
