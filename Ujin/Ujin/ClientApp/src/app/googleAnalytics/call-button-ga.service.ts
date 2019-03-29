import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class CallButtonGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {
    var sendEvent = this.gaService.sendEvent;
    this.addEvent(
      $(".call-button"),
      "click",
      () => {
        sendEvent(CallButtontEvtCat.NAME, CallButtontEvtCat.click)
      }
    )
  }
}

enum CallButtontEvtCat {
  NAME = "callButton",
  click = "click"
}
