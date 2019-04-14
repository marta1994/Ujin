import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  public email: string;

  public phone: string;

  public discountHref: string;

  constructor(private socialService: SocialService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe((res) => {
      this.email = res.email;
      this.phone = res.phone;
      this.discountHref = res.discountHref;
    });
  }

  public get phoneHref(): string {
    if (!this.phone) return "";
    return `tel:${this.phone.replace(/ /g, "").replace(/-/g, "")}`;
  }

  public get emailHref(): string {
    if (!this.email) return "";
    return `mailto:${this.email}`;
  }
}
