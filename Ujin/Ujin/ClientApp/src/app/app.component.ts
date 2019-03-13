import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from './api/data-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public deviceType: DeviceType;

  constructor(private _dataLoader: DataLoaderService) {
  }

  private getDeviceType() {
    this._dataLoader.loadData<DeviceType>('api/userAgent/DetermineDeviceType').subscribe(result => {
      this.deviceType = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.getDeviceType();
  }

  public showMobile(): boolean {
    return this.deviceType === DeviceType.Mobile;
  }

  public showDesktop(): boolean {
    return this.deviceType === DeviceType.Desktop || this.deviceType === DeviceType.Unknown;
  }
}

enum DeviceType {
  Unknown = 0,
  Desktop = 1,
  Mobile = 2,
}
