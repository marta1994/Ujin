import * as $ from 'jquery';
import 'hammerjs';
import { ComponentBaseGa } from './component-base.ga';

export class WidgetGa extends ComponentBaseGa {
  
  constructor(sendEvent: (evtCat: string, event: string, label?: string, value?: number) => void) {
    super(sendEvent);
  }

  public registerEvents() {
    const node = document.querySelector('.widget-background');

    const observer = this.getObserver((mutations) => {
      this.subscribeEvents();
    });

    observer.observe(node, {
      subtree: true,
      childList: true
    });
  }

  private subscribeEvents() {
    this.clearAllEvents();

    var sendEvent = this.sendEvent;

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
      sendEvent(WidgetEvtCat.NAME, WidgetEvtCat.sizeChange, endPos);
    });
  }
}

export enum WidgetEvtCat {
  NAME = "widget",
  imgSwipe = "imgSwipe",
  categoryMenuClick = "categoryMenuClick",
  configMenuClick = "configMenuClick",
  sizeChange = "sizeChange"
}
