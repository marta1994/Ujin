import { Injectable } from '@angular/core';
import { GaService } from './ga.service';
import { EventCategory, WidgetEvents, CarouselEvents, ModelPageEvents, OrderPageEvents, CartEvents } from './events';

@Injectable({
  providedIn: 'root'
})
export class GaProdService extends GaService {

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

  public sendEvent(
    evtCat: EventCategory,
    event: WidgetEvents | ModelPageEvents | CarouselEvents | OrderPageEvents | CartEvents,
    label: string = "",
    value: number = null) {
    if (!this.gtag) return;
    this.gtag('event', event, {
      'event_category': evtCat,
      'event_label': label,
      'value': value
    });
  }
}
