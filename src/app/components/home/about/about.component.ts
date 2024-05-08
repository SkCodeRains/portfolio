import { AfterViewInit, Component, Input } from '@angular/core';
import { ParallaxDirective } from '../../../directives/parallax.directive';
import { SlideInOutDirective } from '../../../directives/slide-in-out.directive';

@Component({
  selector: '[#app-generic]',
  standalone: true,
  imports: [ParallaxDirective, SlideInOutDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class GenericComponent {
  @Input() config!: any;
  get active() {
    return this.config.active;
  }
  get imageSource() {
    return this.config.imageSource;
  }

  get highText() {
    return this.config.highText;
  }

  get pageTitle() {
    return this.config.pageTitle;
  }
}
