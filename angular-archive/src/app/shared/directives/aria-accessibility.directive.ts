import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAriaAccessibility]'
})
export class AriaAccessibilityDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  private observer: MutationObserver | undefined;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const elementType = element.tagName.toLowerCase();
    const inputType = element.getAttribute('type')?.toLowerCase();
    // Apply ARIA attributes based on element type
    if (elementType === 'input') {
      this.applyInputAttributes(element, inputType);
    } else if (elementType === 'select') {
      this.applyRole(element, 'listbox');
      this.setAriaLabel(element, 'Select an option');
    } else if (elementType === 'button') {
      // this.applyRole(element, 'button');
      // this.applyAriaDisabled(element);
      this.applyButtonAttributes(element);
      this.observeDisabledState(element);  // Observe the dynamic disabled state
    } else if (elementType === 'ul' || elementType === 'ol') {
      this.applyRole(element, 'list');
      element.querySelectorAll('li').forEach((item: HTMLElement) => this.applyRole(item, 'listitem'));
    } else {
      this.setAriaLabel(element);
    }
  }

  private applyInputAttributes(element: HTMLElement, inputType: string | null): void {
    // Set roles for different input types
    if (inputType === 'checkbox') {
      this.applyRole(element, 'checkbox');
    } else if (inputType === 'radio') {
      this.applyRole(element, 'radio');
    } else {
      this.applyRole(element, 'textbox');
    }

    // Set aria-required if input is required
    this.applyAriaRequired(element);

    // Set aria-label if not already present
    this.setAriaLabel(element);
  }

  private applyRole(element: HTMLElement, role: string): void {
    if (!element.hasAttribute('role')) {
      this.renderer.setAttribute(element, 'role', role);
    }
  }

  private applyAriaRequired(element: HTMLElement): void {
    if (element.hasAttribute('required') && !element.hasAttribute('aria-required')) {
      this.renderer.setAttribute(element, 'aria-required', 'true');
    }
  }

  private applyButtonAttributes(element: HTMLElement): void {
    this.applyRole(element, 'button');
    this.setAriaLabel(element, element.textContent?.trim() || 'Button'); // Set aria-label based on text content
    this.updateAriaDisabled(element);
  }

  private observeDisabledState(element: HTMLElement): void {
    this.observer = new MutationObserver(() => {
      this.updateAriaDisabled(element);
    });

    // Observe changes to attributes on the button element
    this.observer.observe(element, { attributes: true, attributeFilter: ['disabled'] });
  }

  private updateAriaDisabled(element: HTMLElement): void {
    const isDisabled = element.hasAttribute('disabled');
    this.renderer.setAttribute(element, 'aria-disabled', isDisabled.toString());
  }

  private setAriaLabel(element: HTMLElement, defaultLabel = ''): void {
    const label = element.getAttribute('aria-label') || element.getAttribute('placeholder') || element.getAttribute('title') || defaultLabel;
    if (label) {
      this.renderer.setAttribute(element, 'aria-label', label);
    }
  }
}
