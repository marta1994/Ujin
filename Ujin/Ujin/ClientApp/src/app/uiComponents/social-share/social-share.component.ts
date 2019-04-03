import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.less']
})
export class SocialShareComponent implements OnInit {

  constructor(
    private socialService: SocialService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  public get facebookShareUrl(): SafeUrl {
    if (!this.socialService.facebookShareUrl) return null;
    return this.domSanitizer.bypassSecurityTrustUrl(this.socialService.facebookShareUrl);
  }

  public get viberShareUrl(): SafeUrl {
    if (!this.socialService.viberShareUrl) return null;
    return this.domSanitizer.bypassSecurityTrustUrl(this.socialService.viberShareUrl);
  }

  public get messangerShareUrl(): SafeUrl {
    if (!this.socialService.messangerShareUrl) return null;
    return this.domSanitizer.bypassSecurityTrustUrl(this.socialService.messangerShareUrl);
  }

  public get telegramShareUrl(): SafeUrl {
    if (!this.socialService.telegramShareUrl) return null;
    return this.domSanitizer.bypassSecurityTrustUrl(this.socialService.telegramShareUrl);
  }
}
