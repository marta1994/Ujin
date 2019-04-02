import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';
import { DeviceTypeService, DeviceType } from './device-type.service';

@Injectable()
export class SocialService {

  private _socialRefs: SocialRefs;
  private _areRefsLoading: boolean = false;

  constructor(
    private dataLoader: DataLoaderService,
    private deviceTypeService: DeviceTypeService) { }

  public get socialRefs(): SocialRefs {
    if (this._socialRefs) return this._socialRefs;
    this.loadSocialRefs();
    return null;
  }

  private loadSocialRefs() {
    if (this._areRefsLoading) return;
    this._areRefsLoading = true;
    this.dataLoader.loadData<SocialRefs>('api/Social/SocialReferences').subscribe(
      data => {
        this._socialRefs = data;
      },
      error => console.log(error),
      () => this._areRefsLoading = false);
  }

  public get selfHost(): string {
    return this.socialRefs ? this.socialRefs.selfHost : null;
  }

  public get facebookAppId(): string {
    return this.socialRefs ? this.socialRefs.facebookAppId : null;
  }

  public get formattedSelfHost(): string {
    let selfHost = this.selfHost;
    if (!selfHost) return null;
    let formatted = selfHost.replace(/\/\/\:/g, '%3A%2F%2F').replace(/\//g, '%2F');
    formatted += formatted.endsWith('%2F') ? '&amp' : '%2F&amp';
    return formatted;
  }

  public get facebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.selfHost)};src=sdkpreparse`
  }

  public get viberShareUrl(): string {
    if (this.deviceTypeService.deviceType !== DeviceType.Mobile) return null;
    return "viber://forward?text=" + encodeURIComponent(this.selfHost);
  }

  public get messangerShareUrl(): string {
    if (this.deviceTypeService.deviceType !== DeviceType.Mobile) return null;
    return 'fb-messenger://share?link=' + encodeURIComponent(this.selfHost) + '&app_id=' + encodeURIComponent(this.facebookAppId);
  }

  public get telegramShareUrl(): string {
    if (this.deviceTypeService.deviceType !== DeviceType.Mobile) return null;
    return `tg://msg?text=${this.selfHost}`;
  }
}

export interface SocialRefs {
  facebook: string;
  instagram: string;
  pinterest: string;
  selfHost: string;
  facebookAppId: string;
}
