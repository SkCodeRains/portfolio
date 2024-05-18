import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import { RainsScrollDirective } from "../../directives/rains-scroll.directive";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { Router } from "@angular/router";
import { StarsComponent } from "../stars/stars.component";
import { GenericComponent } from "./generic/generic.component";
import { Parallax2Directive } from "../../directives/parallax-2.directive";
import { PortfolioService } from "../../services/portfolio.service";


@Component({
  selector: '[#app-home]',
  standalone: true,
  imports: [RainsScrollDirective, GenericComponent, Parallax2Directive, NgbTooltipModule, LandingPageComponent, StarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;
  private _skills: any;
  public get scrollAmount(): number {
    return this.folioService.scrollAmount;
  }
  @Input()
  public set scrollAmount(value: number) {
    this.folioService.scrollAmount = value;
  }

  constructor(private router: Router, private folioService: PortfolioService) {
    this._skills = this.folioService.skills.filter((item: any, index: number) => {
      return index >= 10 ? false : true;
    });
  }

  aboutConfig: any = {
    active: () => this.scrollAmount == -1,
    highText: `Passionate Full Stack Developer adept in both front-end and back-end development.`,// Quick learner, team player, and poised to elevate any web development project. I'm adaptable and collaborative, ready to enhance any web project.`,
    pageTitle: "About Me",
    imageSource: "./assets/images/AdobeStock_175632386-e1538970544824-1920x960.jpeg"
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
  get skills() {
    return this._skills;
  }
}
