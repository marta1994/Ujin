import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { DeviceService, DeviceType } from 'src/app/services/device.service';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private _socialRefs: SocialRefs;
  private _socialPromise: Promise<SocialRefs>;

  constructor(private _api: ApiService, private _deviceService: DeviceService) { }

  public get socialRefs(): SocialRefs {
    if (this._socialRefs) return this._socialRefs;
    this.loadSocialRefs();
    return null;
  }

  public loadSocialRefs(): Promise<SocialRefs> {
    if (this._socialPromise) return this._socialPromise;
    this._socialPromise = new Promise((resolve, reject) => 
      this._api.loadData<SocialRefs>('api/AppSettings/SocialReferences')
        .then(res => {
          this._socialRefs = res;
          resolve(this._socialRefs);
        },
        err => reject(err)));
    return this._socialPromise;
  }

  public get selfHost(): string {
    return this.socialRefs ? this.socialRefs.selfHost : null;
  }

  public get facebookAppId(): string {
    return this.socialRefs ? this.socialRefs.facebookAppId : null;
  }

  public get facebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.selfHost)};src=sdkpreparse`
  }

  public get viberShareUrl(): string {
    if (this._deviceService.deviceType !== DeviceType.Mobile) return null;
    return "viber://forward?text=" + encodeURIComponent(this.selfHost);
  }

  public get messangerShareUrl(): string {
    if (this._deviceService.deviceType !== DeviceType.Mobile) {
      return "http://www.facebook.com/dialog/send?" +
        "app_id=" + this.facebookAppId +
        "&link=" + encodeURIComponent(this.selfHost) +
        "&redirect_uri=" + encodeURIComponent(this.selfHost);
    }
    return 'fb-messenger://share?link=' + encodeURIComponent(this.selfHost) + '&app_id=' + encodeURIComponent(this.facebookAppId);
  }

  public get telegramShareUrl(): string {
    if (this._deviceService.deviceType !== DeviceType.Mobile) return null;
    return `tg://msg?text=${this.selfHost}`;
  }
}

export interface SocialRefs {
  facebook: string;
  instagram: string;
  pinterest: string;
  selfHost: string;
  facebookAppId: string;
  phones: string[];
  email: string;
  discountHref: string;
}
