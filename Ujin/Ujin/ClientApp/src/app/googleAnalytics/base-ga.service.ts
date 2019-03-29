import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export abstract class BaseGaService {

  private events: IEventInfo[] = [];
  private hammerEvents: IHammerEventInfo[] = [];

  constructor(
    protected gaService: GoogleAnalyticsService) { }

  public abstract registerEvents();

  protected getObserver(handler: (mutations: MutationRecord[]) => void): MutationObserver {
    MutationObserver = MutationObserver || (<any>window).WebKitMutationObserver;
    return new MutationObserver(handler);
  }

  protected addHammerEvent(els: JQuery<HTMLElement>, evt: string, handler: HammerListener) {
    for (var i = 0; i < els.length; ++i) {
      var el = new Hammer(els[i]);
      el.on(evt, handler);
      this.hammerEvents.push({
        element: el,
        eventName: evt,
        handler: handler
      });
    }
  }

  protected addEvent(el: JQuery<HTMLElement>, evt: string, handler: (evt: JQuery.Event) => void) {
    el.on(evt, handler);
    this.events.push({
      element: el,
      eventName: evt,
      handler: handler
    });
  }

  protected clearAllEvents() {
    this.events.forEach(ev => {
      ev.element.off(ev.eventName, ev.handler);
    });
    this.hammerEvents.forEach(ev => {
      ev.element.off(ev.eventName, ev.handler);
    });
    this.events = [];
    this.hammerEvents = [];
  }
}

interface IEventInfo {
  element: JQuery<HTMLElement>;
  eventName: string;
  handler: (evt: JQuery.Event) => void;
}

interface IHammerEventInfo {
  element: HammerManager;
  eventName: string;
  handler: HammerListener;
}
