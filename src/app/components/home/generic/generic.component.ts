import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { SlideInOutDirective } from '../../../directives/slide-in-out.directive';
import { RipplesDirective } from '../../../directives/ripples.directive';
import { Parallax2Directive } from '../../../directives/parallax-2.directive';

@Component({
  selector: '[#app-generic]',
  standalone: true,
  imports: [Parallax2Directive, SlideInOutDirective, RipplesDirective],
  templateUrl: './generic.component.html',
  styleUrl: './generic.component.scss'
})
export class GenericComponent {
  @Output() navigate = new EventEmitter<void>();

  @Input() config!: any;
  @Input() defaultPanel: any = true;
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
  navigateTo() {
    setTimeout(() => {
      this.navigate.emit();
    }, 500);
  }
}
