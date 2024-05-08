import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: '[#app-navbar]',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  folioService = inject(PortfolioService);
  router = inject(Router);

  @ViewChild("links") ul!: ElementRef;

  toggle(div: HTMLDivElement) {
    div.classList.contains('show') ? div.classList.remove('show') : div.classList.add('show');
  }
  navigate(element: HTMLLIElement) {
    let links = ((this.ul.nativeElement as HTMLUListElement).querySelectorAll(".nav-item") as any);
    for (const link of links) {
      link.classList.remove("active");
    }
    element.classList.add("active");
    let page = element.querySelector("a")?.getAttribute("data");
    this.router.navigate([page], { skipLocationChange: true });
  }

  navigateTo(pageNumber: number) {
    this.folioService.scrollAmount = pageNumber;
    console.log(this.folioService);
    
  }
}
