import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInsideViewPort]',
  standalone: true
})
export class InsideViewPortDirective {
  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.onWindowScroll();
  }

  @HostListener('document:movements')
  onWindowScroll() {
    console.log("called");

    // When the user scrolls, check if the element is in the viewport
    setTimeout(() => {
      this.checkIfElementInView();
    }, 1000);
  }

  checkIfElementInView() {
    // Get the bounding rectangle of the element
    const rect = this.element.getBoundingClientRect();

    // Check if any part of the element is within the viewport
    let y = Math.trunc(rect.y)
    const isInView = (
      y == 0
    );

    if (isInView) {
      this.element.style.setProperty('background-color', 'green', 'important');
      // Element is within the viewport
    } else {
      this.element.style.setProperty('background-color', 'red', 'important');
      // Element is not within the viewport
    }
  }

}
