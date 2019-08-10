import { Injectable } from '@angular/core';
import { GaService } from './ga.service';
import { EventCategory, WidgetEvents, CarouselEvents, ModelPageEvents, OrderPageEvents } from './events';

@Injectable({
  providedIn: 'root'
})
export class GaDevService extends GaService {

  constructor() {
    super();
  }

  public sendEvent(
    evtCat: EventCategory,
    event: WidgetEvents | ModelPageEvents | CarouselEvents | OrderPageEvents,
    label: string = "",
    value: number = null) {
    console.log(`event sent: \r\n evtCat: '${evtCat}', \r\n event: '${event}' \r\n label: '${label}' \r\n value: ${value}`);
  }
}
