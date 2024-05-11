import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipples]',
  standalone: true
})
export class RipplesDirective {
  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.element.setAttribute("disabled", "true");
    const rect = (<HTMLElement>event.target)?.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let ripple = document.createElement("span");
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    let attribute = this.element.getAttributeNames().filter((item: string) => item.includes("_ngcontent-ng-"))[0];
    ripple.setAttribute(attribute, "");
    this.element.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }

}
