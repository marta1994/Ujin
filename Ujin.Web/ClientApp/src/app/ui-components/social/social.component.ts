import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SocialService } from './social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.less']
})
export class SocialComponent implements OnInit {

  @Input()
  public direction: Direction = Direction.vertical;

  @Input()
  public size: string = '40px';

  @Input()
  public purpose: Purpose = Purpose.share;

  private _socialButtons: SocialButtonConfig[];

  constructor(
    private socialService: SocialService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().then(() => {
      this._socialButtons = this.purpose === Purpose.share ? this.shareButtons : this.simpleLinkButtons;
      this._socialButtons = this._socialButtons.filter(el => el.url);
    });
  }

  private get simpleLinkButtons(): SocialButtonConfig[] {
    return [
      {
        url: this.socialService.socialRefs.facebook,
        className: "facebook",
        imagePath: "/assets/images/facebook.svg"
      },
      {
        url: this.socialService.socialRefs.instagram,
        className: "instagram",
        imagePath: "/assets/images/instagram.svg"
      },
      {
        url: this.socialService.socialRefs.pinterest,
        className: "pinterest",
        imagePath: "/assets/images/pinterest.svg"
      }
    ];
  }

  private get shareButtons(): SocialButtonConfig[] {
    return [
      {
        url: this.socialService.facebookShareUrl,
        className: "facebook",
        imagePath: "/assets/images/facebook.svg"
      },
      {
        url: this.socialService.viberShareUrl,
        className: "viber",
        imagePath: "/assets/images/viber.svg"
      },
      {
        url: this.socialService.messangerShareUrl,
        className: "messanger",
        imagePath: "/assets/images/messanger.svg"
      },
      {
        url: this.socialService.telegramShareUrl,
        className: "telegram",
        imagePath: "/assets/images/telegram.svg"
      }];
  };

  public get flexDirection(): string {
    return this.direction === Direction.horizontal ? 'row' : 'column';
  }

  public get socialButtons(): SocialButtonConfig[] {
    return this._socialButtons;
  }

  public goToLink(link: string) {
    window.open(link, '_blank');
  }
}

interface SocialButtonConfig {
  url: string;
  className: string;
  imagePath: string;
}

enum Direction {
  vertical = "vertical",
  horizontal = "horizontal"
}

enum Purpose {
  like = "like",
  share = "share"
}
