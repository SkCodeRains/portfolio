import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-stars',
    imports: [CommonModule],
    templateUrl: './stars.component.html',
    styleUrl: './stars.component.scss'
})
export class StarsComponent implements AfterViewInit, OnDestroy {
  destroyed: any;

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  @Input() count = 27;

  private _galaxy!: HTMLDivElement;
  public get galaxy(): HTMLDivElement {
    return this._galaxy;
  }
  @ViewChild("galaxy")
  public set galaxy(value: ElementRef) {
    this._galaxy = value.nativeElement;
  }


  ngAfterViewInit(): void {
    let interval = setInterval(() => {
      this.destroyed === true ? clearInterval(interval) : this.animationFrame();
    }, 1000);
  }
  animationFrame() {
    let delay = (this.getRandomDelay(1, 100) * 10);
    let pos = this.getRandomPosition(20, 200);
    let div = document.createElement("div");
    let index = this.getRandomPosition(-1, 1);
    let scale = "0";
    switch (index) {
      case -1:
        scale = "0.5";
        break;
      case 0:
        scale = "1";
        break;
      case 1:
        scale = "2";
        break;
    }
    div.classList.add("star");
    div.style.left = pos + "%";
    div.style.animationDelay = delay + 'ms';
    div.style.zIndex = index.toString();
    div.style.scale = scale;
    this.galaxy.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 3500 + delay);
  }





  getRandomDelay(min: number, max: number) {
    let random = 0;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  }


  getRandomPosition(min: number, max: number): number {
    let random = 0;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  }

}


