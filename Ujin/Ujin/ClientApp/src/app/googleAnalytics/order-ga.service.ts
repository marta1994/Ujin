import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

declare function fbq(a, b, c);

@Injectable()
export class OrderGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {
    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    this.addEvent(
      $(".order-container .phone-input input"),
      "focus",
      () => {
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.phoneFocus);
      }
    );

    this.addEvent(
      $(".order-container .phone-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.phoneChange, val);
      }
    );

    this.addEvent(
      $(".order-container .name-input input"),
      "focus",
      () => {
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.nameFocus);
      }
    );

    this.addEvent(
      $(".order-container .name-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.nameChange, val);
      }
    );

    this.addEvent(
      $(".order-container .email-input input"),
      "focus",
      () => {
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.emailFocus);
      }
    );

    this.addEvent(
      $(".order-container .email-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.emailChange, val);
      }
    );

    this.addEvent(
      $(".order-container .submit"),
      "click",
      () => {
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.submit);
        let price = Number.parseFloat($(".order-container .price-val").text());
        fbq('track', 'Purchase', {
          value: price,
          currency: '980',
        });
        sendEvent("ecommerce", "purchase", "980", price);
      }
    );

    this.addEvent(
      $(".order-container .next-view"),
      "click",
      () => {
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.nextViewClick);
      }
    );

    this.addEvent(
      $(".order-container .prev-view"),
      "click",
      () => {
        sendEvent(OrderEvtCat.NAME, OrderEvtCat.prevViewClick);
      }
    );
  }

  public dispose() {
    super.dispose();
    this.gaService.sendEvent(OrderEvtCat.NAME, OrderEvtCat.close);
  }
}

enum OrderEvtCat {
  NAME = "orderPopup",
  phoneFocus = "phoneFocus",
  phoneChange = "phoneChange",
  nameFocus = "nameFocus",
  nameChange = "nameChange",
  emailFocus = "emailFocus",
  emailChange = "emailChange",
  nextViewClick = "nextViewClick",
  prevViewClick = "prevViewClick",
  submit = "submit",
  close = "close"
}
