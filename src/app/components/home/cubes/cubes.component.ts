import { AfterViewInit, Component, Input } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';

@Component({
  selector: '[#app-cubes]',
  standalone: true,
  imports: [CubeComponent],
  templateUrl: './cubes.component.html',
  styleUrl: './cubes.component.scss'
})
export class CubesComponent implements AfterViewInit {
  @Input() size!: string
  @Input() count: number = 0;
  arr: any[] = [];

  ngAfterViewInit(): void {
this.arr.length=this.count;
    // let int = setInterval(() => {
    //   if (this.arr.length >= this.count) {
    //     clearInterval(int);
    //   } else
    //     this.arr.length++;
    // }, 500);
  }
}
