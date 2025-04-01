import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-under-contruction',
    imports: [],
    templateUrl: './under-contruction.component.html',
    styleUrl: './under-contruction.component.scss'
})
export class UnderContructionComponent {
  
  constructor(private router: Router) { }

  goto() {
    this.router.navigate(['home'], { skipLocationChange: true });
  }

}
