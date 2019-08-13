import { Injectable } from '@angular/core';
import { EventCategory, WidgetEvents, ModelPageEvents, CarouselEvents, OrderPageEvents, CartEvents, CatalogEvents, MenuEvents } from './events';

@Injectable({
  providedIn: 'root'
})
export abstract class GaService {

  constructor() {
  }

  public abstract sendEvent(
    evtCat: EventCategory,
    event: WidgetEvents | ModelPageEvents | CarouselEvents | OrderPageEvents | CartEvents | CatalogEvents | MenuEvents,
    label?: string,
    value?: number);
}
