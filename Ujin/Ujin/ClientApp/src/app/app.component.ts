import { Component, OnInit } from '@angular/core';
import { DeviceTypeService, DeviceType } from './services/device-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private deviceTypeService: DeviceTypeService) {
  }

  ngOnInit() {
  }

  public showMobile(): boolean {
    return this.deviceTypeService.deviceType === DeviceType.Mobile;
  }

  public showDesktop(): boolean {
    return this.deviceTypeService.deviceType === DeviceType.Desktop
      || this.deviceTypeService.deviceType === DeviceType.Unknown;
  }
}
