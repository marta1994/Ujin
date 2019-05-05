import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { FooterGaService } from '../../googleAnalytics/footer-ga.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit, OnDestroy, AfterViewInit {

  public email: string;

  public phones: string[];

  public discountHref: string;

  constructor(private socialService: SocialService, private gaService: FooterGaService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe((res) => {
      this.email = res.email;
      this.phones = res.phones;
      this.discountHref = res.discountHref;
    });
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public phoneHref(phone): string {
    if (!phone) return "";
    return `tel:${phone.replace(/ /g, "").replace(/-/g, "")}`;
  }

  public get emailHref(): string {
    if (!this.email) return "";
    return `mailto:${this.email}`;
  }
}
