import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

const helpers: any = {
  propertyCache: {},
  vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],

  clamp(value: number, min: number, max: number) {
    return min < max
      ? (value < min ? min : value > max ? max : value)
      : (value < max ? max : value > min ? min : value)
  },

  data(element: { getAttribute: (arg0: string) => any }, name: string) {
    return helpers.deserialize(element.getAttribute('data-' + name))
  },

  deserialize(value: any): any {
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else if (value === 'null') {
      return null
    } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
      return parseFloat(value)
    } else {
      return value
    }
  },

  camelCase(value: any) {
    return value.replace(/-+(.)?/g, (_match: any, character: string) => {
      return character ? character.toUpperCase() : ''
    })
  },

  accelerate(element: any) {
    helpers.css(element, 'transform', 'translate3d(0,0,0) rotate(0.0001deg)')
    helpers.css(element, 'transform-style', 'preserve-3d')
    helpers.css(element, 'backface-visibility', 'hidden')
  },

  transformSupport(value: any) {
    let element = document.createElement('div'),
      propertySupport = false,
      propertyValue = null,
      featureSupport = false,
      cssProperty: any = null,
      jsProperty: any = null
    for (let i = 0, l = helpers.vendors.length; i < l; i++) {
      if (helpers.vendors[i] !== null) {
        cssProperty = helpers.vendors[i][0] + 'transform'
        jsProperty = helpers.vendors[i][1] + 'Transform'
      } else {
        cssProperty = 'transform'
        jsProperty = 'transform'
      }
      if (element.style[jsProperty] !== undefined) {
        propertySupport = true
        break
      }
    }
    switch (value) {
      case '2D':
        featureSupport = propertySupport
        break
      case '3D':
        if (propertySupport) {
          let body: any = document.body || document.createElement('body'),
            documentElement = document.documentElement,
            documentOverflow = documentElement.style.overflow,
            isCreatedBody = false

          if (!document.body) {
            isCreatedBody = true
            documentElement.style.overflow = 'hidden'
            documentElement.appendChild(body)
            body.style.overflow = 'hidden'
            body.style.background = ''
          }

          body.appendChild(element)
          element.style[jsProperty] = 'translate3d(1px,1px,1px)'
          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty)
          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== 'none'
          documentElement.style.overflow = documentOverflow
          body.removeChild(element)

          if (isCreatedBody) {
            body.removeAttribute('style')
            body.parentNode.removeChild(body)
          }
        }
        break
    }
    return featureSupport
  },

  css(element: any, property: any, value: any) {
    let jsProperty = helpers.propertyCache[property]
    if (!jsProperty) {
      for (let i = 0, l = helpers.vendors.length; i < l; i++) {
        if (helpers.vendors[i] !== null) {
          jsProperty = helpers.camelCase(helpers.vendors[i][1] + '-' + property)
        } else {
          jsProperty = property
        }
        if (element.style[jsProperty] !== undefined) {
          helpers.propertyCache[property] = jsProperty
          break
        }
      }
    }
    element.style[jsProperty] = value
  }
}

@Directive({
  selector: '[appParallax]',
  standalone: true
})

export class ParallaxDirective implements AfterViewInit {
  @Input() selector: any;
  inputX = 0;
  inputY = 0;
  motionX: number = 0;
  calibrateX = false;
  motionY: number = 0;
  calibrateY = false;
  elementWidth: number = 0;
  scalarX: number = 10;
  elementHeight: number = 0;
  scalarY: number = 10;
  velocityX: number = 0;
  frictionX: number = 0.1;
  velocityY: number = 0;
  frictionY: number = 0.1;
  layers: Array<HTMLElement> = [];
  depthsX: any;
  depthsY: any;
  invertX: boolean = true;
  invertY: boolean = true;
  raf: any;
  element: any;
  @Input() pointerEvents: boolean = false;










  private _enable: any = true;
  public get enable(): any {
    return this._enable;
  }
  @Input()
  public set enable(value: any) {
    this._enable = value;
    if (this.enable) {
      setTimeout(() => {
        this.onAnimationFrame();
      }, 1500);
    }
  }






  constructor(element: ElementRef) {
    if (window.innerHeight > window.innerWidth) {
      this.enable = false;
      return;
    }
    this.element = element.nativeElement;
    this.depthsX = [];
    this.depthsY = [];
    this.elementWidth = 0;
    this.elementHeight = 0;
    this.inputX = 0;
    this.inputY = 0;

    this.motionX = 0;
    this.motionY = 0;

    this.velocityX = 0;
    this.velocityY = 0;

  }
  ngAfterViewInit(): void {
    this.initialize();
  }
  initialize() {
    if (window.innerHeight>window.innerWidth) return;
    let style = window.getComputedStyle(this.element)
    if (style.getPropertyValue('position') === 'static') {
      this.element.style.position = 'relative';
    }

    // Pointer events
    if (!this.pointerEvents) {
      this.element.style.pointerEvents = 'none';
    }

    // Setup
    this.updateLayers();
    this.enableFrames();

  }

  @HostListener("window:mousemove", ['$event'])
  onMouseMove(event: any) {
    if (!this.enable) return;
    if (event.clientX && event.clientY) {
      let clientX = event.clientX;
      let clientY = event.clientY;

      // Get the bounding rectangle of the element
      let rect = this.element.getBoundingClientRect();

      // Calculate the position of the mouse relative to the element
      let offsetX = clientX - rect.left;
      let offsetY = clientY - rect.top;

      // Map offsetX and offsetY to range [-1, 1]
      this.inputX = (offsetX / rect.width) * 2 - 1;
      this.inputY = (offsetY / rect.height) * 2 - 1;
    }
  }

  enableFrames() {
    if (!this.enable) {
      return;
    }
    this.enable = true

    this.raf = requestAnimationFrame(this.onAnimationFrame.bind(this));
  }


  updateLayers() {
    if (this.selector) {
      this.layers = this.element.querySelectorAll(this.selector)
    } else {
      this.layers = this.element.children
    }

    if (!this.layers.length) {
      console.warn('ParallaxJS: Your scene does not have any layers.')
    }

    this.depthsX = []
    this.depthsY = []

    for (let index = 0; index < this.layers.length; index++) {
      let layer = this.layers[index]

      helpers.accelerate(layer);

      layer.style.position = index ? 'absolute' : 'relative';
      layer.style.display = 'block';
      layer.style.left = "0";
      layer.style.top = "0";

      let depth = helpers.data(layer, 'depth') || 0
      this.depthsX.push(helpers.data(layer, 'depth-x') || depth)
      this.depthsY.push(helpers.data(layer, 'depth-y') || depth)
    }
  }



  onAnimationFrame() {
    if (!this.enable) return;
    this.updateBounds();
    this.motionX = this.inputX;
    this.motionY = this.inputY;
    this.motionX *= this.elementWidth * (this.scalarX / 100);
    this.motionY *= this.elementHeight * (this.scalarY / 100);
    this.velocityX += (this.motionX - this.velocityX) * this.frictionX;
    this.velocityY += (this.motionY - this.velocityY) * this.frictionY;
    for (let index = 0; index < this.layers.length; index++) {
      let layer: HTMLElement = this.layers[index],
        depthX: number = this.depthsX[index],
        depthY: number = this.depthsY[index],
        xOffset: number = this.velocityX * (depthX * (this.invertX ? -1 : 1)),
        yOffset: number = this.velocityY * (depthY * (this.invertY ? -1 : 1))
      this.setPosition(layer, xOffset, yOffset)
    }
    this.raf = requestAnimationFrame(this.onAnimationFrame.bind(this))
  }
  setPosition(element: HTMLElement, x: number, y: number) {
    x = Math.round(x);
    y = Math.round(y);
    helpers.css(element, 'transform', `translate3d( ${x}px,${y}px , 0)`);
  }

  updateBounds() {
    let bounds = this.element.getBoundingClientRect();
    this.elementWidth = bounds.width;
    this.elementHeight = bounds.height;
  }

}
