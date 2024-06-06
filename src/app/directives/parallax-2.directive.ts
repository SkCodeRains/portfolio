import { AfterViewInit, DestroyRef, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

/**
* Parallax.js
* @author CodeRains , Mohammed Shaikh - skcoderains@gmail.com
* @description Creates a parallax effect between an array of layers,
*              driving the motion from the gyroscope output of a smartdevice.
*              If no gyroscope is available, the cursor position is used.
*/
const helpers: any = {
  propertyCache: {},
  vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],

  clamp(value: number, min: number, max: number) {
    return min < max
      ? (value < min ? min : value > max ? max : value)
      : (value < max ? max : value > min ? min : value)
  },

  data(element: HTMLElement, name: string) {
    return helpers.deserialize(element.getAttribute('data-' + name))
  },

  deserialize(value: any) {
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
    return value.replace(/-+(.)?/g, (match: any, character: any) => {
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
      propertySupport: any = false,
      propertyValue: any = null,
      featureSupport: any = false,
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
          let body = document.body || document.createElement('body'),
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
            body.parentNode?.removeChild(body)
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

const MAGIC_NUMBER = 30,
  DEFAULTS: Parallax2Directive | any = {
    relativeInput: false,
    clipRelativeInput: false,
    hoverOnly: false,
    calibrationThreshold: 100,
    calibrationDelay: 500,
    supportDelay: 500,
    calibrateX: false,
    calibrateY: true,
    invertX: true,
    invertY: true,
    limitX: false,
    limitY: false,
    scalarX: 10.0,
    scalarY: 10.0,
    frictionX: 0.1,
    frictionY: 0.1,
    originX: 0.5,
    originY: 0.5,
    pointerEvents: false,
    precision: 1,
    onReady: null,
    selector: null
  }
@Directive({
  selector: '[appParallax2]',
  standalone: true
})
export class Parallax2Directive implements AfterViewInit, OnDestroy {
  private _active: boolean = false;
  public get active(): boolean {
    return this._active;
  }
  @Input()
  public set active(value: boolean) {
    this._active = value;
    if (this.enabled && value == false) {
      this.disable();
    } else if (this.enabled == false && value) {
      this.Initialize();
    }
  }
  inputElement: any;
  calibrationTimer: any;
  calibrationFlag: boolean;
  enabled: boolean;
  depthsX: any[];
  depthsY: any[];
  raf: any;
  bounds: any;
  elementPositionX: number;
  elementPositionY: number;
  elementWidth: number;
  elementHeight: number;
  elementCenterX: number;
  elementCenterY: number;
  elementRangeX: number;
  elementRangeY: number;
  calibrationX: number;
  calibrationY: number;
  inputX: number;
  inputY: number;
  motionX: number;
  motionY: number;
  velocityX: number;
  velocityY: number;
  windowWidth: any;
  windowHeight: any;
  windowCenterX: any;
  windowCenterY: any;
  windowRadiusX: any;
  windowRadiusY: any;
  portrait: boolean;
  desktop: boolean;
  motionSupport: boolean;
  orientationSupport: boolean;
  orientationStatus: number;
  motionStatus: number;
  transform2DSupport: undefined;
  transform3DSupport: any;
  pointerEvents: any;
  onReady: any;
  selector: any;
  layers: any;
  originX: any;
  originY: any;
  detectionTimer: any;
  calibrateX: any;
  calibrateY: any;
  invertX: any;
  invertY: any;
  frictionX: any;
  frictionY: any;
  scalarX: any;
  scalarY: any;
  limitX: any;
  limitY: any;
  calibrationThreshold!: number;
  hoverOnly!: boolean;
  relativeInput: any;
  clipRelativeInput: any;
  @Input() options: any
  supportDelay: number = 500;
  precision: number = 1;
  calibrationDelay: number = 500;
  constructor(private el: ElementRef,) {
    if (!this.inputElement) {
      this.inputElement = el.nativeElement;
    }
    const data: any = {
      calibrateX: helpers.data(this.inputElement, 'calibrate-x'),
      calibrateY: helpers.data(this.inputElement, 'calibrate-y'),
      invertX: helpers.data(this.inputElement, 'invert-x'),
      invertY: helpers.data(this.inputElement, 'invert-y'),
      limitX: helpers.data(this.inputElement, 'limit-x'),
      limitY: helpers.data(this.inputElement, 'limit-y'),
      scalarX: helpers.data(this.inputElement, 'scalar-x'),
      scalarY: helpers.data(this.inputElement, 'scalar-y'),
      frictionX: helpers.data(this.inputElement, 'friction-x'),
      frictionY: helpers.data(this.inputElement, 'friction-y'),
      originX: helpers.data(this.inputElement, 'origin-x'),
      originY: helpers.data(this.inputElement, 'origin-y'),
      pointerEvents: helpers.data(this.inputElement, 'pointer-events'),
      precision: helpers.data(this.inputElement, 'precision'),
      relativeInput: helpers.data(this.inputElement, 'relative-input'),
      clipRelativeInput: helpers.data(this.inputElement, 'clip-relative-input'),
      hoverOnly: helpers.data(this.inputElement, 'hover-only'),
      inputElement: document.querySelector(helpers.data(this.inputElement, 'input-element')),
      selector: helpers.data(this.inputElement, 'selector')
    }

    let ref: any = this;
    for (const key in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
        ref[key] = DEFAULTS[key];
      }
    }

    for (let key in data) {
      if (data[key] === null) {
        delete data[key];
      } else {
        ref[key] = data[key];
      }
    }


    this.calibrationTimer = null
    this.calibrationFlag = true
    this.enabled = false
    this.depthsX = []
    this.depthsY = []
    this.raf = null

    this.bounds = null
    this.elementPositionX = 0
    this.elementPositionY = 0
    this.elementWidth = 0
    this.elementHeight = 0

    this.elementCenterX = 0
    this.elementCenterY = 0

    this.elementRangeX = 0
    this.elementRangeY = 0

    this.calibrationX = 0
    this.calibrationY = 0

    this.inputX = 0
    this.inputY = 0

    this.motionX = 0
    this.motionY = 0

    this.velocityX = 0
    this.velocityY = 0


    this.windowWidth = null
    this.windowHeight = null
    this.windowCenterX = null
    this.windowCenterY = null
    this.windowRadiusX = null
    this.windowRadiusY = null
    this.portrait = false
    this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i)
    this.motionSupport = !!window.DeviceMotionEvent && !this.desktop
    this.orientationSupport = !!window.DeviceOrientationEvent && !this.desktop
    this.orientationStatus = 0
    this.motionStatus = 0
  }
  ngAfterViewInit(): void {
    this.Initialize();
  }
  ngOnDestroy(): void {
    this.disable();
  }
  Initialize() {
    if (this.transform2DSupport === undefined) {
      this.transform2DSupport = helpers.transformSupport('2D')
      this.transform3DSupport = helpers.transformSupport('3D')
    }

    // Configure Context Styles
    if (this.transform3DSupport) {
      helpers.accelerate(this.inputElement)
    }

    let style = window.getComputedStyle(this.inputElement)
    if (style.getPropertyValue('position') === 'static') {
      this.inputElement.style.position = 'relative'
    }

    // Pointer events
    if (!this.pointerEvents) {
      this.inputElement.style.pointerEvents = 'none'
    }

    // Setup
    this.updateLayers()
    this.updateDimensions()
    this.enable()
    this.queueCalibration(this.calibrationDelay)
  }

  doReadyCallback() {
    if (this.onReady) {
      this.onReady()
    }
  }

  updateLayers() {
    if (this.selector) {
      this.layers = this.inputElement.querySelectorAll(this.selector)
    } else {
      this.layers = this.inputElement.children
    }

    if (!this.layers.length) {
      console.warn('ParallaxJS: Your scene does not have any layers.')
    }

    this.depthsX = []
    this.depthsY = []

    for (let index = 0; index < this.layers.length; index++) {
      let layer = this.layers[index]

      if (this.transform3DSupport) {
        helpers.accelerate(layer)
      }

      layer.style.position = index ? 'absolute' : 'relative'
      layer.style.display = 'block'
      layer.style.left = 0
      layer.style.top = 0

      let depth = helpers.data(layer, 'depth') || 0
      this.depthsX.push(helpers.data(layer, 'depth-x') || depth)
      this.depthsY.push(helpers.data(layer, 'depth-y') || depth)
    }
  }

  updateDimensions() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.windowCenterX = this.windowWidth * this.originX
    this.windowCenterY = this.windowHeight * this.originY
    this.windowRadiusX = Math.max(this.windowCenterX, this.windowWidth - this.windowCenterX)
    this.windowRadiusY = Math.max(this.windowCenterY, this.windowHeight - this.windowCenterY)
  }

  updateBounds() {
    this.bounds = this.inputElement.getBoundingClientRect()
    this.elementPositionX = this.bounds.left
    this.elementPositionY = this.bounds.top
    this.elementWidth = this.bounds.width
    this.elementHeight = this.bounds.height
    this.elementCenterX = this.elementWidth * this.originX
    this.elementCenterY = this.elementHeight * this.originY
    this.elementRangeX = Math.max(this.elementCenterX, this.elementWidth - this.elementCenterX)
    this.elementRangeY = Math.max(this.elementCenterY, this.elementHeight - this.elementCenterY)
  }

  queueCalibration(delay: number) {
    clearTimeout(this.calibrationTimer)
    this.calibrationTimer = setTimeout(this.onCalibrationTimer.bind(this), delay)
  }

  enable() {
    if (this.enabled) {
      return
    }
    this.enabled = true

    if (this.orientationSupport) {
      this.portrait = false
      // window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this))
      this.detectionTimer = setTimeout(this.onOrientationTimer.bind(this), this.supportDelay)
    } else if (this.motionSupport) {
      this.portrait = false
      // window.addEventListener('devicemotion', this.onDeviceMotion.bind(this))
      this.detectionTimer = setTimeout(this.onMotionTimer.bind(this), this.supportDelay)
    } else {
      this.calibrationX = 0
      this.calibrationY = 0
      this.portrait = false
      // window.addEventListener('mousemove', this.onMouseMove.bind(this))
      this.doReadyCallback()
    }

    // window.addEventListener('resize', this.onWindowResize.bind(this))
    this.raf = requestAnimationFrame(this.onAnimationFrame.bind(this))
  }
  disable() {
    if (!this.enabled) {
      return
    }
    this.enabled = false
  }

  calibrate(x: number, y: number) {
    this.calibrateX = x === undefined ? this.calibrateX : x
    this.calibrateY = y === undefined ? this.calibrateY : y
  }

  invert(x: number, y: number) {
    this.invertX = x === undefined ? this.invertX : x
    this.invertY = y === undefined ? this.invertY : y
  }

  friction(x: number, y: number) {
    this.frictionX = x === undefined ? this.frictionX : x
    this.frictionY = y === undefined ? this.frictionY : y
  }

  scalar(x: number, y: number) {
    this.scalarX = x === undefined ? this.scalarX : x
    this.scalarY = y === undefined ? this.scalarY : y
  }

  limit(x: number, y: number) {
    this.limitX = x === undefined ? this.limitX : x
    this.limitY = y === undefined ? this.limitY : y
  }

  origin(x: number, y: number) {
    this.originX = x === undefined ? this.originX : x
    this.originY = y === undefined ? this.originY : y
  }

  setInputElement(element: HTMLElement) {
    this.inputElement = element
    this.updateDimensions()
  }

  setPosition(element: HTMLElement, x: any, y: any) {
    x = x.toFixed(this.precision) + 'px'
    y = y.toFixed(this.precision) + 'px'
    if (this.transform3DSupport) {
      helpers.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)')
    } else if (this.transform2DSupport) {
      helpers.css(element, 'transform', 'translate(' + x + ',' + y + ')')
    } else {
      element.style.left = x
      element.style.top = y
    }
  }

  onOrientationTimer() {
    if (this.orientationSupport && this.orientationStatus === 0) {
      this.disable()
      this.orientationSupport = false
      this.enable()
    } else {
      this.doReadyCallback()
    }
  }

  onMotionTimer() {
    if (this.motionSupport && this.motionStatus === 0) {
      this.disable()
      this.motionSupport = false
      this.enable()
    } else {
      this.doReadyCallback()
    }
  }

  onCalibrationTimer() {
    this.calibrationFlag = true
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.updateDimensions()
  }

  onAnimationFrame() {
    if (!this.enabled) return;
    this.updateBounds()
    let calibratedInputX = this.inputX - this.calibrationX,
      calibratedInputY = this.inputY - this.calibrationY
    if ((Math.abs(calibratedInputX) > this.calibrationThreshold) || (Math.abs(calibratedInputY) > this.calibrationThreshold)) {
      this.queueCalibration(0)
    }
    if (this.portrait) {
      this.motionX = this.calibrateX ? calibratedInputY : this.inputY
      this.motionY = this.calibrateY ? calibratedInputX : this.inputX
    } else {
      this.motionX = this.calibrateX ? calibratedInputX : this.inputX
      this.motionY = this.calibrateY ? calibratedInputY : this.inputY
    }
    this.motionX *= this.elementWidth * (this.scalarX / 100)
    this.motionY *= this.elementHeight * (this.scalarY / 100)
    if (!isNaN(parseFloat(this.limitX))) {
      this.motionX = helpers.clamp(this.motionX, -this.limitX, this.limitX)
    }
    if (!isNaN(parseFloat(this.limitY))) {
      this.motionY = helpers.clamp(this.motionY, -this.limitY, this.limitY)
    }
    this.velocityX += (this.motionX - this.velocityX) * this.frictionX
    this.velocityY += (this.motionY - this.velocityY) * this.frictionY
    for (let index = 0; index < this.layers.length; index++) {
      let layer = this.layers[index],
        depthX = this.depthsX[index],
        depthY = this.depthsY[index],
        xOffset = this.velocityX * (depthX * (this.invertX ? -1 : 1)),
        yOffset = this.velocityY * (depthY * (this.invertY ? -1 : 1))
      this.setPosition(layer, xOffset, yOffset)
    }
    this.raf = requestAnimationFrame(this.onAnimationFrame.bind(this))
  }

  rotate(beta: number, gamma: number) {
    // Extract Rotation
    let x = (beta || 0) / MAGIC_NUMBER, //  -90 :: 90
      y = (gamma || 0) / MAGIC_NUMBER // -180 :: 180

    // Detect Orientation Change
    let portrait = this.windowHeight > this.windowWidth
    if (this.portrait !== portrait) {
      this.portrait = portrait
      this.calibrationFlag = true
    }

    if (this.calibrationFlag) {
      this.calibrationFlag = false
      this.calibrationX = x
      this.calibrationY = y
    }

    this.inputX = x
    this.inputY = y
  }
  // @HostListener("window:deviceorientation")
  onDeviceOrientation(event: any) {
    let beta = event.beta
    let gamma = event.gamma
    if (beta !== null && gamma !== null) {
      this.orientationStatus = 1
      this.rotate(beta, gamma)
    }
  }

  // @HostListener("window:devicemotion")
  onDeviceMotion(event: any) { 
    let beta = event.rotationRate.beta
    let gamma = event.rotationRate.gamma
    if (beta !== null && gamma !== null) {
      this.motionStatus = 1
      this.rotate(beta, gamma)
    }
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: any) {
    if (!this.enabled) return;
    let clientX = event.clientX,
      clientY = event.clientY

    // reset input to center if hoverOnly is set and we're not hovering the element
    if (this.hoverOnly &&
      ((clientX < this.elementPositionX || clientX > this.elementPositionX + this.elementWidth) ||
        (clientY < this.elementPositionY || clientY > this.elementPositionY + this.elementHeight))) {
      this.inputX = 0
      this.inputY = 0
      return
    }

    if (this.relativeInput) {
      // Clip mouse coordinates inside element bounds.
      if (this.clipRelativeInput) {
        clientX = Math.max(clientX, this.elementPositionX)
        clientX = Math.min(clientX, this.elementPositionX + this.elementWidth)
        clientY = Math.max(clientY, this.elementPositionY)
        clientY = Math.min(clientY, this.elementPositionY + this.elementHeight)
      }
      // Calculate input relative to the element.
      if (this.elementRangeX && this.elementRangeY) {
        this.inputX = (clientX - this.elementPositionX - this.elementCenterX) / this.elementRangeX
        this.inputY = (clientY - this.elementPositionY - this.elementCenterY) / this.elementRangeY
      }
    } else {
      // Calculate input relative to the window.
      if (this.windowRadiusX && this.windowRadiusY) {
        this.inputX = (clientX - this.windowCenterX) / this.windowRadiusX
        this.inputY = (clientY - this.windowCenterY) / this.windowRadiusY
      }
    }
  }

  version() {
    return '4.1.0'
  }




}
