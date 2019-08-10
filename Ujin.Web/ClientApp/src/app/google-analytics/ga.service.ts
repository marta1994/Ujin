import { Injectable } from '@angular/core';
import { EventCategory, WidgetEvents, ModelPageEvents, CarouselEvents, OrderPageEvents } from './events';

@Injectable({
  providedIn: 'root'
})
export abstract class GaService {

  constructor() {
  }

  public abstract sendEvent(
    evtCat: EventCategory,
    event: WidgetEvents | ModelPageEvents | CarouselEvents | OrderPageEvents,
    label?: string,
    value?: number);
}
