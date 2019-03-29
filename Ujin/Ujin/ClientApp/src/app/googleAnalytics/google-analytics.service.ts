import { Injectable } from '@angular/core';

@Injectable()
export abstract class GoogleAnalyticsService {

  constructor() {
  }

  public abstract sendEvent(evtCat: string, event: string, label?: string, value?: number);
}
