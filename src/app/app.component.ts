import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StarsComponent } from './components/stars/stars.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, StarsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      // window.location.reload();
      // alert(window.innerHeight); 
    }, 2000);
  }

  constructor(private router: Router) {
    this.router.navigate(["home"], { skipLocationChange: true });
  }

}
