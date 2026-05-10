import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCdWaiting]',
})
export class WaitingDirective implements OnInit {
  constructor(private eRef: ElementRef) {}
  ngOnInit(): void {
    this.eRef.nativeElement.style.marginTop = '0px';
    this.eRef.nativeElement.style.left = '0';
    this.eRef.nativeElement.style.backgroundColor = 'red !important';
    this.eRef.nativeElement.style.width = '100%';
    this.eRef.nativeElement.style.height = '100%';
    this.eRef.nativeElement.style.margin = 'auto';
    this.eRef.nativeElement.style.zIndex = '10000';
    this.eRef.nativeElement.style.position = 'absolute';

  }
}
