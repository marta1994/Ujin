import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class MobileGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {
    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    var elementsAppeared = [];

    var allElements = $(".scroll-point").toArray();

    this.addEvent($(window) as any, "scroll", () => {
      if (allElements.length == 0) return;
      const scrollPosition = window.pageYOffset;
      for (var el of allElements) {
        let componentPosition = el.offsetTop;
        if (scrollPosition >= componentPosition - 300) {
          let classList: string[] = [].slice.apply(el.classList);
          var label = classList.find(cl => cl.startsWith("scroll-point") && cl !== "scroll-point");
          sendEvent(MobileEvtCat.NAME, MobileEvtCat.windowScroll, label);
          elementsAppeared.push(el);
        }
      }

      elementsAppeared.forEach(el => {
        var ind = allElements.indexOf(el);
        if (ind < 0) return;
        allElements.splice(ind, 1);
      });
    });
  }
}

enum MobileEvtCat {
  NAME = "mobile",
  windowScroll = "windowScroll",
}
