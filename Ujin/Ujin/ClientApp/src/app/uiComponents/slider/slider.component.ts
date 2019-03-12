import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef }
  from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';
import { SliderHelperService } from './slider-helper.service';
import { Direction, SliderDirectionService, Point } from './slider-direction.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
  providers: [
    SliderDirectionService
  ]
})
export class SliderComponent implements OnInit {

  constructor(
    private _windowScrollService: WindowScrollService,
    private _directionService: SliderDirectionService,
    private _helper: SliderHelperService) {
  }

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
  public width: string = '100%';

  
  public get direction(): Direction {
    return this._directionService.direction;
  }

  @Input()
  public set direction(value: Direction) {
    this._directionService.direction = value;
  } 

  @Input()
  public min: number = 0;

  @Input()
  public max: number = 100;

  @Input()
  public step: number = 1;

  private _currentInteraction: InteractionState = new InteractionState();

  public get actualWidth(): string {
    return this._directionService.getWidth(this.thickness, this.width);
  }

  public get actualHeight(): string {
    return this._directionService.getHeight(this.thickness, this.width);
  }

  ngOnInit() {
    this._directionService.direction = this.direction;
    if (this.value == null) {
      this.setValue(this.getVal((this.min + this.max) / 2, this.getElemStartEnd()));
    }
    this.setThumbFromVal();
  }

  public get scaleStyles(): any {
    var styleObj = {
      'width': this.actualWidth,
      'height': this.actualHeight
    }
    this._helper.setBorderRadius(styleObj, this.thickness / 2);
    return styleObj;
  }

  public get thumbStyles(): any {
    var size = this.thickness * 3;
    var style = {
      'width': size + 'px',
      'height': size + 'px'
    };
    this._helper.setBorderRadius(style, size / 2);
    this._directionService.setThumbPosition(style, this._thumbOffset, this.thickness, size);
    return style;
  }

  private getElemStartEnd(): { start: number, end: number } {
    let sliderEl = this._sliderScale.nativeElement;
    var startPt = new Point(sliderEl.offsetLeft, sliderEl.offsetTop);
    var endPt = new Point(sliderEl.offsetLeft + sliderEl.offsetWidth, sliderEl.offsetTop + sliderEl.offsetHeight);
    return {
      start: this._directionService.getDirCoord(startPt),
      end: this._directionService.getDirCoord(endPt)
    };
  }

  private getVal(point: number, startEnd: { start: number, end: number }): number {
    let distRatio = (point - startEnd.start) / (startEnd.end - startEnd.start);
    let pointNormalized = this.min + (this.max - this.min) * distRatio;
    let stepsCount = Math.floor((pointNormalized - this.min) / this.step);
    return this.min + stepsCount * this.step;
  }

  private calculateValue(pt: Point) {
    var elemStartEnd = this.getElemStartEnd();
    var currentPos = this._directionService.getDirCoord(pt);
    if (currentPos <= elemStartEnd.start) {
      currentPos = elemStartEnd.start;
    }
    if (currentPos >= elemStartEnd.end) {
      currentPos = elemStartEnd.end;
    }
    this.setValue(this.getVal(currentPos, elemStartEnd));
    this.setThumbOffset(currentPos, elemStartEnd)
  }

  private setThumbFromVal() {
    let distRatio = (this.value - this.min) / (this.max - this.min);
    let elemStartEnd = this.getElemStartEnd();
    let point = elemStartEnd.start + distRatio * (elemStartEnd.end - elemStartEnd.start);
    this.setThumbOffset(point, elemStartEnd);
  }

  private setThumbOffset(currentPos: number, elemStartEnd: { start: number, end: number }) {
    let thumbSize = this._sliderThumb.nativeElement.offsetWidth;
    let maxOffset = elemStartEnd.end - elemStartEnd.start - thumbSize;
    this._thumbOffset = Math.min(maxOffset, currentPos - elemStartEnd.start);
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
  }

  public startMove(event: TouchEvent | MouseEvent) {
    if (this._currentInteraction.isInteractionStarted) {
      return;
    }
    this._windowScrollService.disableScroll();
    var pt = this.getPointFromEvent(event);
    this._currentInteraction.startInteraction(pt.x, pt.y);
    this.calculateValue(pt);
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

class InteractionState {
  private _interactionInProgress: boolean = false;

  public stopInteraction() {
    this._interactionInProgress = false;
  }

  public startInteraction(x: number, y: number) {
    this._interactionInProgress = true;;
  }

  public get isInteractionStarted(): boolean {
    return this._interactionInProgress;
  }
}
