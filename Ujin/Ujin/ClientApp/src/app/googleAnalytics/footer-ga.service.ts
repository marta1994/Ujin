import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class FooterGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {

    this.addMutationObserver(
      'app-footer .phones-containers',
      (mutations) => {
        this.subscribeEvents();
      }, {
        subtree: true,
        childList: true
      });
  }

  public subscribeEvents() {
    this.clearAllEvents();

    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    this.addEvent(
      $("app-footer .phones-containers .contact-href"),
      "click",
      (evt: JQuery.ClickEvent) => {
        var phone = $(evt.currentTarget).attr("href");
        sendEvent(FooterEvtCat.NAME, FooterEvtCat.phoneClick, phone);
      }
    );

    this.addEvent(
      $("app-footer .email-prop .contact-href"),
      "click",
      () => {
        sendEvent(FooterEvtCat.NAME, FooterEvtCat.emailClick);
      }
    );

    this.addEvent(
      $("app-footer .discount .discount-action"),
      "click",
      () => {
        sendEvent(FooterEvtCat.NAME, FooterEvtCat.discountClick);
      }
    );
  }
}

enum FooterEvtCat {
  NAME = "footer",
  phoneClick = "phoneClick",
  emailClick = "emailClick",
  discountClick = "discountClick"
}
