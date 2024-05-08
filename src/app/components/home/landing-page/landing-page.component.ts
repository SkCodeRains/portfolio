import { Component, Input } from '@angular/core';
import { ParallaxDirective } from '../../../directives/parallax.directive';
import { SlideInOutDirective } from '../../../directives/slide-in-out.directive';

@Component({
  selector: '[#app-landing-page]',
  standalone: true,
  imports: [ParallaxDirective, SlideInOutDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  @Input() active = false;
}
