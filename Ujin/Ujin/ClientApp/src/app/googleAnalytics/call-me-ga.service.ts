import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class CallMeGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {
    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    this.addEvent(
      $(".call-me-form .phone-input input"),
      "focus",
      () => {
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.phoneFocus);
      }
    );

    this.addEvent(
      $(".call-me-form .phone-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.phoneChange, val);
      }
    );

    this.addEvent(
      $(".call-me-form .name-input input"),
      "focus",
      () => {
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.nameFocus);
      }
    );

    this.addEvent(
      $(".call-me-form .name-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.nameChange, val);
      }
    );

    this.addEvent(
      $(".call-me-form .submit"),
      "click",
      () => {
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.submit);
      }
    );
  }

  public dispose() {
    super.dispose();
    this.gaService.sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.close);
  }
}

enum CallMeEvtCat {
  NAME = "callMePopup",
  phoneFocus = "phoneFocus",
  phoneChange = "phoneChange",
  nameFocus = "nameFocus",
  nameChange = "nameChange",
  submit = "submit",
  close = "close"
}
