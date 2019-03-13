import { Injectable } from '@angular/core';
import { SliderHelperService } from './slider-helper.service';

@Injectable()
export class SliderDirectionService {

  public direction: Direction;

  constructor(private _helper: SliderHelperService) {
  }
  
  public getWidth(thickness: number, size: string): string {
    return this.direction === Direction.vertical ?
      this._helper.px(thickness) :
      size;
  }

  public getHeight(thickness: number, size: string): string {
    return this.direction === Direction.vertical ?
      size :
      this._helper.px(thickness);
  }

  public setThumbPosition(styleObj: Object, thumbOffset: number, thickness: number, thumbSize: number) {
    let offsetAttr = this.direction === Direction.vertical ? 'top' : 'left';
    let centerAttr = this.direction === Direction.vertical ? 'left' : 'top';
    styleObj[offsetAttr] = this._helper.px(thumbOffset);
    styleObj[centerAttr] = this._helper.px(-thumbSize / 2 + thickness / 2);
  }

  public getDirCoord(pt: Point) {
    return this.direction === Direction.vertical ? pt.y : pt.x;
  }
}

export enum Direction {
  vertical = "vertical",
  horizontal = "horizontal"
}

export class Point {
  constructor(
    public x: number,
    public y: number) {
  }
}
