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
    var sendEvent = this.gaService.sendEvent;
    this.addEvent(
      $(".phone-input input"),
      "focus",
      () => {
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.phoneFocus);
      }
    );

    this.addEvent(
      $(".phone-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.phoneChange, val);
      }
    );

    this.addEvent(
      $(".name-input input"),
      "focus",
      () => {
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.nameFocus);
      }
    );

    this.addEvent(
      $(".name-input input"),
      "change",
      (evt: JQuery.ChangeEvent) => {
        var val = evt.currentTarget.value;
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.nameChange, val);
      }
    );

    this.addEvent(
      $(".submit"),
      "click",
      () => {
        sendEvent(CallMeEvtCat.NAME, CallMeEvtCat.submit);
      }
    );
  }
}

enum CallMeEvtCat {
  NAME = "callMePopup",
  phoneFocus = "phoneFocus",
  phoneChange = "phoneChange",
  nameFocus = "nameFocus",
  nameChange = "nameChange",
  submit = "submit"
}
