import { Component } from '@angular/core';
import { CubesComponent } from './cubes/cubes.component';

@Component({
  selector: '[#app-home]',
  standalone: true,
  imports: [CubesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
