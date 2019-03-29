import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export class GoogleAnalyticsProdService extends GoogleAnalyticsService {

  constructor() {
      super();
  }

  private get gtag(): any {
    if (!(<any>window).gtag) {
      console.error("no gtag function");
      return null;
    }
    return (<any>window).gtag;
  }

  protected sendEvent(evtCat: string, event: string, label: string = "", value: number = null) {
    if (!this.gtag) return;
    this.gtag('event', event, {
      'event_category': evtCat,
      'event_label': label,
      'value': value
    });
  }

}
