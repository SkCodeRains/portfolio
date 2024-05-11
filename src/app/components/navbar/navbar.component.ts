import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[#app-navbar]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  folioService = inject(PortfolioService);

  @ViewChild("links") ul!: ElementRef;
  show: boolean = false;

  constructor(private router: Router) { }

  toggle() {
    this.show = !this.show;
  }
  navigate(element: HTMLLIElement) {
    let links = ((this.ul.nativeElement as HTMLUListElement).querySelectorAll(".nav-item") as any);
    for (const link of links) {
      link.classList.remove("active");
    }
    element.classList.add("active");
    let page = element.querySelector("a")?.getAttribute("data");
    this.toggle();
    this.router.navigate([page], { skipLocationChange: true });

  }

  navigateTo(pageNumber: number) {
    this.folioService.scrollAmount = -pageNumber;
  }
}
