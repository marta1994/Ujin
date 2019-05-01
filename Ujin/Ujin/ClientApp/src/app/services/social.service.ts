import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';
import { DeviceTypeService, DeviceType } from './device-type.service';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Injectable()
export class SocialService {

  private _socialRefs: SocialRefs;
  private _currenctObservable: Observable<SocialRefs>;

  constructor(
    private dataLoader: DataLoaderService,
    private deviceTypeService: DeviceTypeService) { }

  public get socialRefs(): SocialRefs {
    if (this._socialRefs) return this._socialRefs;
    this.loadSocialRefs();
    return null;
  }

  public loadSocialRefs(): Observable<SocialRefs> {
    if (this._currenctObservable) return this._currenctObservable;
    this._currenctObservable =
      this.dataLoader.loadData<SocialRefs>('api/Social/SocialReferences')
      .pipe(share())
      .map(
        data => {
          this._socialRefs = data;
          return data;
        });
    return this._currenctObservable;
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
    if (this.deviceTypeService.deviceType !== DeviceType.Mobile) return null;
    return "viber://forward?text=" + encodeURIComponent(this.selfHost);
  }

  public get messangerShareUrl(): string {
    if (this.deviceTypeService.deviceType !== DeviceType.Mobile) {
      return "http://www.facebook.com/dialog/send?" +
        "app_id=" + this.facebookAppId +
        "&link=" + encodeURIComponent(this.selfHost) +
        "&redirect_uri=" + encodeURIComponent(this.selfHost);
    }
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
  phones: string[];
  email: string;
  discountHref: string;
}
