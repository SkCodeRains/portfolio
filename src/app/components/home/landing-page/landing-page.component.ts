import { Component, Input } from '@angular/core';
import { ParallaxDirective } from '../../../directives/parallax.directive';
import { SlideInOutDirective } from '../../../directives/slide-in-out.directive';
import { Parallax2Directive } from '../../../directives/parallax-2.directive';

@Component({
  selector: '[#app-landing-page]',
  standalone: true,
  imports: [ParallaxDirective, SlideInOutDirective,Parallax2Directive],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  @Input() active = false;
}
