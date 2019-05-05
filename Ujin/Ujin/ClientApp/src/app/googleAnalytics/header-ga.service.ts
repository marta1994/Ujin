import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class HeaderGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents() {
    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    //this.addEvent(
    //  $("app-desktop-header .like-item"),
    //  "mouseenter", () => {
    //    sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.likeOpenClose, "open");
    //  }
    //);
    //this.addEvent(
    //  $("app-desktop-header .like-item"),
    //  "mouseleave", () => {
    //    sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.likeOpenClose, "close");
    //  }
    //);

    //this.addEvent(
    //  $("app-desktop-header .share-item"),
    //  "mouseenter", () => {
    //    sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.shareOpenClose, "open");
    //  }
    //);
    //this.addEvent(
    //  $("app-desktop-header .share-item"),
    //  "mouseleave", () => {
    //    sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.shareOpenClose, "close");
    //  }
    //);
    this.addEvent(
      $("app-mobile-header .share-header span"),
      "click", (event: JQuery.ClickEvent) => {
        var isOpen = $(event.currentTarget.closest(".share-header")).hasClass("open");
        sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.shareOpenClose, isOpen ? "open" : "close");
      }
    );

    this.addEvent(
      $("app-desktop-header .contacts-item a"),
      "click", () => {
        sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.contactsClick);
      }
    );
    this.addEvent(
      $("app-mobile-header .contacts-link a"),
      "click", () => {
        sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.contactsClick);
      }
    );

    this.addEvent(
      $("app-desktop-header .language-select .lang-option"),
      "click", (event: JQuery.ClickEvent) => {
        var name = $(event.currentTarget).attr("name");
        sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.langChangeClick, `desktop_${name}`);
      }
    );
    this.addEvent(
      $("app-mobile-header .languages-container .lang-option"),
      "click", (event: JQuery.ClickEvent) => {
        var name = $(event.currentTarget).attr("name");
        sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.langChangeClick, `mobile_${name}`);
      }
    );

    this.addEvent(
      $("app-mobile-header .hamburger"),
      "click", (event: JQuery.ClickEvent) => {
        var isOpen = $(event.currentTarget).hasClass("is-active");
        sendEvent(HeaderEvtCat.NAME, HeaderEvtCat.menuOpenClose, isOpen ? "open" : "close");
      }
    );
  }
}

enum HeaderEvtCat {
  NAME = "header",
  likeOpenClose = "likeOpenClose",
  shareOpenClose = "shareOpenClose",
  contactsClick = "contactsClick",
  langChangeClick = "langChangeClick",
  menuOpenClose = "menuOpenClose"
}
