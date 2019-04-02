import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';

@Injectable()
export class DeviceTypeService {

  private _deviceType: DeviceType;
  private isLoading = false;

  constructor(private dataLoader: DataLoaderService) { }

  public get deviceType(): DeviceType {
    if (this._deviceType != null) return this._deviceType;
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
}
