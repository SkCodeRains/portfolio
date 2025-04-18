import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from '../../services/portfolio.service';
import { RipplesDirective } from '../../directives/ripples.directive';

@Component({
  selector: 'app-about-me-full',
  imports: [NgbProgressbarModule],
  templateUrl: './about-me-full.component.html',
  styleUrl: './about-me-full.component.scss'
})
export class AboutMeFullComponent {

  constructor(private router: Router, private dataService: PortfolioService) { }  // Inject Router in constructor

  goto() {
    this.router.navigate(['home'], { skipLocationChange: true });
  }

  get skills() {
    return this.dataService.skills;
  }
  get details() {
    return this.dataService.details;
  }


}
