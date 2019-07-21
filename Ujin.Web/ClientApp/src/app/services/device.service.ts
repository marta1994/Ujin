import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() {
    this.recalcOrientation();
    window.addEventListener('orientationchange', () => this.recalcOrientation());
  }

  public get deviceType(): DeviceType {
    if (this.orientation === ScreenOrientation.Portrait)
      return DeviceType.Mobile;
    return window.innerWidth < 780 ? DeviceType.Mobile : DeviceType.Desktop;
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

export enum DeviceType {
  Unknown = 0,
  Desktop = 1,
  Mobile = 2,
  Tablet = 3
}

