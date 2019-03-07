import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from './api/data-loader.service';
import { LocaleService } from 'angular-l10n';
import { languages } from './configs/localization.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public deviceType: DeviceType;
  public languages = languages;

  constructor(
    private locale: LocaleService,
    private dataLoader: DataLoaderService) {
  }

  private getDeviceType() {
    this.dataLoader.loadData<DeviceType>('api/userAgent/DetermineDeviceType').subscribe(result => {
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

  public setLanguage(langCode) {
    this.locale.setCurrentLanguage(langCode);
  }
}

enum DeviceType {
  Unknown = 0,
  Desktop = 1,
  Mobile = 2,
}
