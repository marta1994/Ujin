import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export class GoogleAnalyticsDevService extends GoogleAnalyticsService{

  constructor() {
    super();
  }

  public sendEvent(evtCat: string, event: string, label: string = "", value: number = null) {
    console.log(`event sent: \r\n evtCat: '${evtCat}', \r\n event: '${event}' \r\n label: '${label}' \r\n value: ${value}`);
  }

}
