import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { SocialLinksGaService } from '../../googleAnalytics/social-links-ga.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.less'],
  providers: [
    SocialLinksGaService
  ]
})
export class SocialShareComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  public direction: Direction = Direction.vertical;

  @Input()
  public size: string = '40px';

  @Input()
  public purpose: Purpose = Purpose.share;

  private _socialButtons: SocialButtonConfig[];

  @ViewChild('socialshare')
  public self: ElementRef;

  constructor(
    private socialService: SocialService, private gaService: SocialLinksGaService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe(() => {
      this._socialButtons = this.purpose === Purpose.share ? this.shareButtons : this.simpleLinkButtons;
      this._socialButtons = this._socialButtons.filter(el => el.url);
    });
  }

  ngAfterViewInit() {
    this.gaService.registerEvents(this.self.nativeElement);
  }

  ngOnDestroy() {
    this.gaService.dispose();
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
  simpleLink = "simpleLink",
  share = "share"
}
