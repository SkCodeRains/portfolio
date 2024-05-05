import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: '[#app-cube]',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss'
})
export class CubeComponent implements AfterViewInit {

  @Input() size: string = "2rem"

  @ViewChild("cube") cube!: ElementRef;

  ngAfterViewInit(): void {
    let cube: HTMLDivElement = this.cube.nativeElement;
    cube.style.height = this.size;
    cube.style.width = this.size;
    document.documentElement.style.setProperty('--translateZ', (parseInt(this.size) / 2) + 'em'); // Update the value
    cube.style.top = this.getRandomNumber(5, 90) + "%";
    cube.style.left = this.getRandomNumber(5, 90) + "%";
    // setInterval(() => {
    //   cube.style.top = this.getRandomNumber(5, 90) + "%";
    //   cube.style.left = this.getRandomNumber(5, 90) + "%";
    // }, this.getRandomNumber(5,10)*1000)
    this.moveElement();
  }
  moveElement() {
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



}
