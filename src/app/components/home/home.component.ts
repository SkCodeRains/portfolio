import { Component, ViewChild, ElementRef, Input, inject } from "@angular/core";
import { RainsScrollDirective } from "../../directives/rains-scroll.directive";
import { GenericComponent } from "./about/about.component";
import { PortfolioService } from "../../services/portfolio.service";
import { ParallaxDirective } from "../../directives/parallax.directive";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { LandingPageComponent } from "./landing-page/landing-page.component";


@Component({
  selector: '[#app-home]',
  standalone: true,
  imports: [RainsScrollDirective, GenericComponent, ParallaxDirective, NgbTooltipModule, LandingPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;
  folioService = inject(PortfolioService);
  public get scrollAmount(): number {
    return this.folioService.scrollAmount;
  }
  @Input()
  public set scrollAmount(value: number) {
    this.folioService.scrollAmount = value;
  }

  aboutConfig: any = {
    active: () => this.scrollAmount == -1,
    highText: "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.",
    pageTitle: "About Me",
    imageSource: "./assets/images/about_me2.png"
  };

  projectsConfig: any = {
    active: () => this.scrollAmount == -2,
    highText: "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.",
    pageTitle: "Projects",
    imageSource: "./assets/images/projects.jpg"
  };


  contactConfig: any = {
    active: () => this.scrollAmount == -3,
    highText: "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.",
    pageTitle: "Contact Me",
    imageSource: "./assets/images/contact.jpg"
  };

}
