import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent implements AfterViewInit {

  @Input() count = 27;
  stars: any = [];

  private _galaxy!: HTMLDivElement;
  public get galaxy(): HTMLDivElement {
    return this._galaxy;
  }
  @ViewChild("galaxy")
  public set galaxy(value: ElementRef) {
    this._galaxy = value.nativeElement;
  }


  ngAfterViewInit(): void {
    for (let index = 1; index <= this.count; index++) {
      setTimeout(() => {
        this.stars.push({
          pos: this.getRandomPosition(20, 200) + "%",
          delay: (this.getRandomDelay(1, 100) * 10) + 'ms'
        })
      }, 100 * this.getRandomDelay(1, 100));
    }


    setInterval(() => {
      let delay = (this.getRandomDelay(1, 100) * 10);
      let pos = this.getRandomPosition(20, 200);
      let div = document.createElement("div");
      div.classList.add("star");
      div.style.left = pos + "%";
      div.style.animationDelay = delay + 'ms';
      this.galaxy.appendChild(div);
      setTimeout(() => {
        div.remove();
      }, 5000 + delay);
    }, 500);




  }





  getRandomDelay(min: number, max: number) {
    let random = 0;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    for (const star of this.stars) {
      if (star.delay == random) {
        random = this.getRandomPosition(min, max);
      }
    }
    return random;
  }


  getRandomPosition(min: number, max: number): number {
    let random = 0;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    for (const star of this.stars) {
      if (star.pos == random) {
        random = this.getRandomPosition(min, max);
      }
    }
    return random;
  }

}


