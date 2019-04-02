import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.less']
})
export class SocialShareComponent implements OnInit {

  constructor(private socialService: SocialService) { }

  ngOnInit() {
  }

  public get facebookShareUrl(): string {
    return this.socialService.facebookShareUrl;
  }

  public get viberShareUrl(): string {
    return this.socialService.viberShareUrl;
  }

  public get messangerShareUrl(): string {
    return this.socialService.messangerShareUrl;
  }

  public get telegramShareUrl(): string {
    return this.socialService.telegramShareUrl;
  }
}
