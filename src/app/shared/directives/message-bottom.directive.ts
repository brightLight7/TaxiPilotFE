import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMessageBottom]'
})
export class MessageBottomDirective implements OnInit {
@Input() cdBottom='10px';

constructor(private ef: ElementRef) { }

  ngOnInit(): void {
    this.ef.nativeElement.style.color =  '#b3aaaa';
    this.ef.nativeElement.style.fontSize =  '12px';
    this.ef.nativeElement.style.lineHight =  '#b3aaaa';
    this.ef.nativeElement.style.color =  '14.5px';
    this.ef.nativeElement.style.border =  '1px dotted #b3babd;';
    this.ef.nativeElement.style.borderLeft =  '5px dotted #b3babd;';
    this.ef.nativeElement.style.position =  'absolute';
    this.ef.nativeElement.style.bottom =  this.cdBottom;
  }

}
