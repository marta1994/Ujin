import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';
import { ScreenOrientationService, ScreenOrientation } from './screen-orientation.service';

@Injectable()
export class DeviceTypeService {

  private _deviceType: DeviceType;
  private isLoading = false;

  constructor(
    private dataLoader: DataLoaderService,
    private screenOrientation: ScreenOrientationService) { }

  public get deviceType(): DeviceType {
    if (this._deviceType != null) {
      if (this._deviceType == DeviceType.Desktop) {
        if (this.screenOrientation.orientation === ScreenOrientation.Portrait)
          return DeviceType.Mobile;
        return window.innerWidth < 780 ? DeviceType.Tablet : DeviceType.Desktop;
      }
      return this._deviceType;
    }
    this.loadDeviceType();
    return null;
  }

  private loadDeviceType() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.dataLoader.loadData<DeviceType>('api/userAgent/DetermineDeviceType').subscribe(result => {
      this._deviceType = result;
    },
      error => console.error(error),
      () => this.isLoading = false);
  }

}

export enum DeviceType {
  Unknown = 0,
  Desktop = 1,
  Mobile = 2,
  Tablet = 3
}
