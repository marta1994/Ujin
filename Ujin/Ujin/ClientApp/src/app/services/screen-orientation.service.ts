import { Injectable } from '@angular/core';

@Injectable()
export class ScreenOrientationService {

  constructor() {
    this.recalcOrientation();
    window.addEventListener('orientationchange', () => this.recalcOrientation());
  }

  public orientation: ScreenOrientation;

  private recalcOrientation() {
    switch (window.orientation) {
      case -90:
      case 90:
      case undefined:
        this.orientation = ScreenOrientation.Landscape;
        break;
      default:
        this.orientation = ScreenOrientation.Portrait;
        break;
    }
  }
}

export enum ScreenOrientation {
  Portrait = 0,
  Landscape = 1
}
