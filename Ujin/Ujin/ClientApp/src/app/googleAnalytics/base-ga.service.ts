import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export abstract class BaseGaService {

  private events: IEventInfo[] = [];
  private hammerEvents: IHammerEventInfo[] = [];
  private observers: MutationObserver[] = [];

  constructor(
    protected gaService: GoogleAnalyticsService) { }

  public abstract registerEvents();

  private getObserver(handler: (mutations: MutationRecord[]) => void): MutationObserver {
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

  protected addMutationObserver(
    selector: string,
    handler: (mutations: MutationRecord[]) => void,
    options?: MutationObserverInit) {

    const node = document.querySelector(selector);
    var observer = this.getObserver(handler);
    observer.observe(node, options);
    this.observers.push(observer);
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

  private clearAllObservers() {
    this.observers.forEach(ob => ob.disconnect());
    this.observers = [];
  }

  public dispose() {
    this.clearAllEvents();
    this.clearAllObservers();
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
