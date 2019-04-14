import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class RingInfoGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {
    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    this.addEvent(
      $("app-ring-info .order-button"),
      "click",
      () => {
        sendEvent(RingInfoEvtCat.NAME, RingInfoEvtCat.orderClick)
      }
    );
  }
}

enum RingInfoEvtCat {
  NAME = "price",
  orderClick = "orderClick"
}
