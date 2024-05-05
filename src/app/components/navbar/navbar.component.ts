import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: '[#app-navbar]',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output('navigateTo') loadPage: EventEmitter<number> = new EventEmitter<number>()
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
  }

  navigateTo(pageNumber: number) { 
    this.loadPage.emit(pageNumber)
  }
}
