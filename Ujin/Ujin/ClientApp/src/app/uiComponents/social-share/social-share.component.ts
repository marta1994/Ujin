import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.less']
})
export class SocialShareComponent implements OnInit {

  private _socialButtons: SocialButtonConfig[];

  constructor(
    private socialService: SocialService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe(() => {
      this._socialButtons = [
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
      this._socialButtons = this._socialButtons.filter(el => el.url);
    });
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
