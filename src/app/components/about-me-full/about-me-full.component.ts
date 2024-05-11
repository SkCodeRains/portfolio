import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me-full',
  standalone: true,
  imports: [],
  templateUrl: './about-me-full.component.html',
  styleUrl: './about-me-full.component.scss'
})
export class AboutMeFullComponent {
  
  constructor(private router: Router) { }  // Inject Router in constructor

  goto() {
    this.router.navigate(['home'], { skipLocationChange: true });
  }

}
