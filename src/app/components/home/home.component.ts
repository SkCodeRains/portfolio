import { Component, ViewChild, ElementRef, Input, inject, Inject } from "@angular/core";
import { RainsScrollDirective } from "../../directives/rains-scroll.directive";
import { GenericComponent } from "./about/about.component";
import { PortfolioService } from "../../services/portfolio.service";
import { ParallaxDirective } from "../../directives/parallax.directive";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { Router } from "@angular/router";


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

  constructor(private router: Router) { }

  aboutConfig: any = {
    active: () => this.scrollAmount == -1,
    highText: `Passionate Full Stack Developer adept in both front-end and back-end development. Quick learner, team player, and poised to elevate any web development project. I'm adaptable and collaborative, ready to enhance any web project.`,
    pageTitle: "About Me",
    imageSource: "./assets/images/about_me2.png"
  };
  /* 
  
  #F700F6
  #BD0086
  #280061
  #0B0C43
  
  */
  projectsConfig: any = {
    active: () => this.scrollAmount == -2,
    highText: `Explore my world of projects! Each one tells a unique story of passion and creativity. Dive in and witness the magic.`,
    pageTitle: "Projects",
    imageSource: "./assets/images/projects.jpeg"
  };


  contactConfig: any = {
    active: () => this.scrollAmount == -3,
    highText: "Let's connect! Whether it's a question or a project idea, I'm all ears. Reach out below or find me on social media.",
    pageTitle: "Contact Me",
    imageSource: "./assets/images/interaction-design-and-technologies_282333076.jpeg"
  };

  navigateTo(page: string) {
    this.router.navigate([page], {
      skipLocationChange: true
    })
  }
}
