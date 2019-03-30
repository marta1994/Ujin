import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';
import 'hammerjs';

@Injectable()
export class WidgetGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {

    this.addMutationObserver(
      '.widget-background',
      (mutations) => {
        this.subscribeEvents();
      }, {
        subtree: true,
        childList: true
      });
  }

  private subscribeEvents() {
    this.clearAllEvents();

    var sendEvent = this.gaService.sendEvent;

    this.addHammerEvent($(".widget-background .image-wrapper"), "swipeleft", () => {
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.imgSwipe, "left");
    });

    this.addHammerEvent($(".widget-background .image-wrapper"), "swiperight", () => {
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.imgSwipe, "right");
    });

    this.addEvent($(".widget-background .category-menu .menu-item"), "click", (evt: JQuery.ClickEvent) => {
      var label = evt.currentTarget.getAttribute("id");
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.categoryMenuClick, label);
    });

    this.addEvent($(".widget-background .config-menu .menu-item"), "click", (evt: JQuery.ClickEvent) => {
      var label = evt.currentTarget.getAttribute("id");
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.configMenuClick, label);
    });

    this.addEvent($(".widget-background .size-case .slider-input"), "change", (event: JQuery.ChangeEvent) => {
      var endPos = event.currentTarget.value;
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.sizeSliderChange, endPos);
    });

    this.addEvent($(".widget-background .size-case app-counter .counter-input"), "change", (event: JQuery.ChangeEvent) => {
      var endPos = event.currentTarget.value;
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.sizeCounterInput, endPos);
    });

    this.addEvent($(".widget-background .size-case app-counter .up-arrow"), "click", () => {
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.sizeCounterUp);
    });

    this.addEvent($(".widget-background .size-case app-counter .down-arrow"), "click", () => {
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.sizeCounterDown);
    });
  }
}

enum WidgetEvtCat {
  NAME = "widget",
  imgSwipe = "imgSwipe",
  categoryMenuClick = "categoryMenuClick",
  configMenuClick = "configMenuClick",
  sizeSliderChange = "sizeSliderChange",
  sizeCounterInput = "sizeCounterInput",
  sizeCounterUp = "sizeCounterUp",
  sizeCounterDown = "sizeCounterDown"
}
