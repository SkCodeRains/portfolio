import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSlideInOut]',
  standalone: true
})
export class SlideInOutDirective {

  element: HTMLElement;
  cubic: any = "transition: all 1.1568s cubic-bezier(0.645, 0.045, 0.355, 1) 0s";
  forward: boolean = false;
  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  private _direction!: string;
  public get direction(): string {
    return this._direction;
  }
  @Input()
  public set direction(value: string) {
    this._direction = value;
    switch (this.direction) {
      case "left":
        this.element.setAttribute("style", "transform:translateX(-100vw)")
        break;

      case "right":
        this.element.setAttribute("style", "transform:translateX(100vw)");
        break;
      case "top":
        this.element.style.transform = "translateY(-100vh)";
        break;
      case "bottom":
        this.element.style.transform = "translateY(100vh)";
        break;
    }
  }






  @Input() set inView(isview: boolean) {
    this.forward = isview;
    if (this.direction) {
      requestAnimationFrame(this.doTranslation.bind(this, isview));
    }
  }

  doTranslation(forward: boolean) {
    switch (this.direction) {
      case "left":
        this.moveToRight(forward);
        break;

      case "right":
        this.moveToLeft(forward);
        break;
      case "top":

        break;
      case "bottom":

        break;
    }
  }
  moveToLeft(forward: boolean) {
    if (forward) {
      this.translateX(0);
    } else {
      this.translateX(100);
    }
  }
  moveToRight(forward: boolean) {
    if (forward) {
      this.translateX(0);
    } else {
      this.translateX(-100);
    }
  }

  translateX(to: number) {
    this.element.setAttribute("style", `${this.cubic};transform:translateX(${to}vw);opacity:${Math.abs(to)==100?-10:1}`);
  }

  translateY(to: number) {
    this.element.setAttribute("style", `${this.cubic};transform:translateY(${to}vw);opacity:${Math.abs(to)==100?0:1}`);

  }
}
