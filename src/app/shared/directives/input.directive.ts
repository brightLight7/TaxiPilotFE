import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyledInput]',
})
export class StyledInputDirective implements OnInit {
  @Input() cdPadding = '12px 15px';
  @Input() borderRadius = 0;
  @Input() borderWidth = 1;
  @Input() borderColor = '#ccc';
  @Input() width = '100%';
  @Input() minWidth = 100
  @Input() height = 40;
  @Input() color = '#000';
  @Input() bgColor = '#fff';
  @Input() iconName = 'user';
  @Input() iconColor = 'red';
  @Input() iconBgColor = 'white';
  innerHTMLContent = ''; // Holds the content to insert as inner HTML

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const inputElement = this.el.nativeElement;
    const style = inputElement.style;

    // Apply styling to the input element
    style.padding = this.cdPadding;
    style.fontSize = '16px';
    style.background = this.bgColor;
    style.transition = 'border-color 0.3s ease';
    style.color = this.color;
    style.width = this.width;
    style.minWidth = this.minWidth === 0 ? '100% !important' : `${this.minWidth}px !important`;
    style.boxSizing = 'border-box';
    style.height = `${this.height}px`;
    style.marginBottom = '8px';
    style.marginRight = '8px';
    style.borderRadius = `${this.borderRadius}px`;
    style.border = `${this.borderWidth}px solid ${this.borderColor}`;
    style.borderRight = `${this.borderWidth}px solid gray`;
    style.borderBottom = `${this.borderWidth}px solid gray`;
    style.borderLeft = `${this.borderWidth}px solid #efebeb`;
    style.borderTop = `${this.borderWidth}px solid #efebeb`;
    this.borderColor = 'white gray gray #efebeb'
    style.outline = `1px solid #d9d9d9`;

    // Create and style the icon element
    let icon;
    if (this.iconName === 'planeTakeOff' || this.iconName === 'planeLand') {
      // Create a <section> element if the icon is planeTakeOff or planeLand
      icon = this.renderer.createElement('section');
      this.renderer.addClass(icon, 'material-symbols-outlined');

      // Set the innerHTMLContent based on the icon name
      if (this.iconName === 'planeTakeOff') {
        this.innerHTMLContent = 'flight_takeoff';
      } else {
        this.innerHTMLContent = 'flight_land';
      }

      this.renderer.setStyle(icon, 'font-size', '25px'); // Icon font size
      this.renderer.setProperty(icon, 'innerHTML', this.innerHTMLContent);
    } else if(this.iconName === '') {
      this.renderer.setStyle(icon, 'display', 'none');
    } else {
      // Use <i> element for Font Awesome icons
      icon = this.renderer.createElement('i');
      this.renderer.addClass(icon, 'fa');
      this.renderer.addClass(icon, `fa-${this.iconName}`);
      this.renderer.setStyle(icon, 'font-size', '22px'); // Icon font size
    }

    // Style the icon element to match the input and add a border
    this.renderer.setStyle(icon, 'border-radius', `0px ${this.borderRadius}px ${this.borderRadius}px 0px`);
    this.renderer.setStyle(icon, 'position', 'absolute');
    this.renderer.setStyle(icon, 'right', '0px');
    this.renderer.setStyle(icon, 'top', '41%');
    this.renderer.setStyle(icon, 'transform', 'translateY(-50%)');
    this.renderer.setStyle(icon, 'pointer-events', 'none');
    this.renderer.setStyle(icon, 'padding', '0 8px'); // Apply padding around the icon
    this.renderer.setStyle(icon, 'border', `1px solid ${this.borderColor}`);
    this.renderer.setStyle(icon, 'height', `${this.height}px`); // Match icon height to input height
    this.renderer.setStyle(icon, 'display', 'flex');
    this.renderer.setStyle(icon, 'align-items', 'center'); // Center icon vertically
    this.renderer.setStyle(icon, 'color', this.iconColor); // Icon color
    this.renderer.setStyle(icon, 'background', this.iconBgColor); // Icon background color

    // Ensure the input element's parent allows absolute positioning for the icon
    if (inputElement.parentNode) {
      this.renderer.setStyle(inputElement.parentNode, 'position', 'relative');
      this.renderer.appendChild(inputElement.parentNode, icon);
    } else {
      console.warn("The input element's parent was not found.");
    }
  }
}
