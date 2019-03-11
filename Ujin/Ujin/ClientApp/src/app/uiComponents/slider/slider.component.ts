import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

  constructor(private _windowScrollService: WindowScrollService) { }
 
  public width: string = '100%';

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() value: number;

  private setValue(val: number) {
    this.value = val;
    this.valueChange.emit(this.value);
  }

  @ViewChild('sliderscale')
  private _sliderScale: ElementRef;

  @ViewChild('sliderthumb')
  private _sliderThumb: ElementRef;
  private _thumbOffset: number = 0;

  @Input()
  public thickness: number = 4;

  @Input()
  public direction: Direction = Direction.horizontal;

  @Input()
  public min: number = 0;

  @Input()
  public max: number = 100;

  @Input()
  public step: number = 1;

  private _currentInteraction: InteractionState = new InteractionState();

  private get _thicknessPx(): string {
    return this.thickness + "px";
  }

  public get actualWidth(): string | number {
    return this.direction === Direction.vertical ? this._thicknessPx : this.width;
  }

  public get actualHeight(): string | number {
    return this.direction === Direction.vertical ? this.width : this._thicknessPx;
  }

  ngOnInit() {
    if (this.value == null) {
      this.setValue(this.getVal((this.min + this.max) / 2, this.getElemStartEnd()));
    }
  }

  public get scaleStyles(): any {
    return {
      'width': this.actualWidth,
      'height': this.actualHeight,
      'border-radius': (this.thickness / 2) + "px",
      '-webkit-border-radius': (this.thickness / 2) + "px",
      '-moz-border-radius': (this.thickness / 2) + "px",
      '-o-border-radius': (this.thickness / 2) + "px",
    }
  }

  public get thumbStyles(): any {
    var size = this.thickness * 3;
    var offsetAttr = this.direction === Direction.vertical ? 'top' : 'left';
    var centerAttr = this.direction === Direction.vertical ? 'left' : 'top';
    var style = {
      'width': size + 'px',
      'height': size + 'px',
      'border-radius': (size / 2) + "px",
      '-webkit-border-radius': (size / 2) + "px",
      '-moz-border-radius': (size / 2) + "px",
      '-o-border-radius': (size / 2) + "px"
    };
    style[offsetAttr] = this._thumbOffset + "px";
    style[centerAttr] = (-size / 2 + this.thickness / 2) + "px";
    return style;
  }

  private calculateThumbPosition(pt: { x: number, y: number }) {
    var pos = this.getMainCoord(pt);
    var elemStartEnd = this.getElemStartEnd();
    var thumbSize = this._sliderThumb.nativeElement.offsetWidth;
    if (pos <= elemStartEnd.start) {
      this._thumbOffset = 0;
      return;
    }
    if (pos >= elemStartEnd.end) {
      this._thumbOffset = elemStartEnd.end - elemStartEnd.start - thumbSize;
      return;
    }
    this._thumbOffset = pos - elemStartEnd.start - thumbSize;
  }

  private getMainCoord(pt: { x: number, y: number }): number {
    return this.direction === Direction.vertical ? pt.y : pt.x;
  }

  private getElemStartEnd(): { start: number, end: number } {
    var startPt = {
      x: this._sliderScale.nativeElement.offsetLeft,
      y: this._sliderScale.nativeElement.offsetTop
    };
    var endPt = {
      x: this._sliderScale.nativeElement.offsetLeft + this._sliderScale.nativeElement.offsetWidth,
      y: this._sliderScale.nativeElement.offsetTop + this._sliderScale.nativeElement.offsetHeight
    };
    return {
      start: this.getMainCoord(startPt),
      end: this.getMainCoord(endPt)
    };
  }

  private getVal(point: number, startEnd: { start: number, end: number }): number {
    let distRatio = (point - startEnd.start) / (startEnd.end - startEnd.start);
    let pointNormalized = this.min + (this.max - this.min) * distRatio;
    let stepsCount = Math.floor((pointNormalized - this.min) / this.step);
    return this.min + stepsCount * this.step;
  }

  private calculateValue(pt: { x: number, y: number }) {
    var elemStartEnd = this.getElemStartEnd();
    var currentPos = this.getMainCoord(pt);
    if (currentPos <= elemStartEnd.start) {
      this.setValue(this.min);
      return;
    }
    if (currentPos >= elemStartEnd.end) {
      this.setValue(this.getVal(elemStartEnd.end, elemStartEnd));
      return;
    }
    this.setValue(this.getVal(currentPos, elemStartEnd));
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  public moveStop() {
    if (!this._currentInteraction.isInteractionStarted) {
      return;
    }
    this._windowScrollService.enableScroll();
    this._currentInteraction.stopInteraction();
  }

  @HostListener('document:mousemove', ['$event'], )
  @HostListener('document:touchmove', ['$event'])
  public moveProgress(event: TouchEvent | MouseEvent) {
    if (!this._currentInteraction.isInteractionStarted) {
      return;
    }
    var pt = this.getPointFromEvent(event);
    this.calculateValue(pt);
    this.calculateThumbPosition(pt);
  }

  public startMove(event: TouchEvent | MouseEvent) {
    if (this._currentInteraction.isInteractionStarted) {
      return;
    }
    this._windowScrollService.disableScroll();
    event.stopPropagation();
    var pt = this.getPointFromEvent(event);
    this._currentInteraction.startInteraction(pt.x, pt.y);
  }

  private getPointFromEvent(event: TouchEvent | MouseEvent): { x: number, y: number } {
    if (event instanceof TouchEvent) {
      return {
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY
      };
    }
    if (event instanceof MouseEvent) {
      return {
        x: event.pageX,
        y: event.pageY
      }
    }
    return null;
  }

}

enum Direction {
  vertical = "vertical",
  horizontal = "horizontal"
}

class InteractionState {
  public startX: number;
  public startY: number;

  public stopInteraction() {
    this.startX = null;
    this.startY = null;
  }

  public startInteraction(x: number, y: number) {
    this.startX = x;
    this.startY = y;
  }

  public get isInteractionStarted(): boolean {
    return this.startY != null && this.startX != null;
  }
}
