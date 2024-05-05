import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appRainsScroll]',
  standalone: true
})
export class RainsScrollDirective {
  mainContainer: any;


  private _scrollAmount: number = 0;
  startY: number = 0;
  threshold: number = 100;

  public get scrollAmount(): number {
    return this._scrollAmount;
  }
  @Input() public set scrollAmount(value: number) {
    if (value > 0) {
      value = -value;
    }
    this._scrollAmount = value;
    this.mainContainer.style.transform = `translate3d(0px, ${this.scrollAmount}00vh, 0px)`;
  }
  @Output() scrollAmountChange = new EventEmitter<number>();
  maxScroll = 0;





  constructor(private el: ElementRef) {
    this.mainContainer = el.nativeElement;
    this.mainContainer.style.transition = 'all 1000ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s';
    setTimeout(() => {
      this.maxScroll = (1 - this.mainContainer.children.length)
    }, 500);

  }

  boundHandler = this.throttle(1000,
    (event: any) => {
      return this.handleMoveEvent(event[0]);
    }
  );


  @HostListener('document:wheel', ['$event'])
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  eventsHandler(event: any) {
    if (!event.ctrlKey) {
      return this.boundHandler(event);
    }
  }
  handleMoveEvent(event: any) {
    if (event.deltaY > 0 || event.key === 'ArrowDown') {
      if (this.scrollAmount > this.maxScroll) {
        this.scrollAmount--;
      }
    }
    else if (event.deltaY < 0 || event.key === 'ArrowUp') {
      if (this.scrollAmount < 0) {
        this.scrollAmount++;
      }
    }
    this.mainContainer.style.transform = `translate3d(0px, ${this.scrollAmount}00vh, 0px)`;
    this.scrollAmountChange.emit(this.scrollAmount);
  }
  throttle(delay: number, cb: (...args: any) => void) {
    let shouldWait = false;
    return (...args: any) => {
      if (shouldWait) return;
      cb(args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    }
  }
  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    // Calculate the difference in Y position between touch start and touch move
    const diffY = event.touches[0].clientY - this.startY;
    let cEvent: any;
    // Check if the absolute difference exceeds the threshold
    if (Math.abs(diffY) > this.threshold) {
      if (diffY > 0) {
        cEvent = new KeyboardEvent('keyup', {
          key: 'ArrowUp'
        });
      } else if (diffY < 0) {
        cEvent = new KeyboardEvent('keydown', {
          key: 'ArrowDown'
        });
      }
      document.dispatchEvent(cEvent);
    }
  }
}
