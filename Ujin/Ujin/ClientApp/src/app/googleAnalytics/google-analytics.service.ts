import { Injectable } from '@angular/core';
import { WidgetGa } from './widget.ga';

@Injectable()
export abstract class GoogleAnalyticsService {

  private widgetGA: WidgetGa;

  constructor() {
    this.widgetGA = new WidgetGa((ec, e, l, v) => this.sendEvent(ec, e, l, v));
  }

  public registerWidgetEvents() {
    this.widgetGA.registerEvents();
  }

  protected abstract sendEvent(evtCat: string, event: string, label?: string, value?: number);
}
