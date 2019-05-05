import { Injectable } from '@angular/core';
import { BaseGaService } from './base-ga.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import * as $ from 'jquery';

@Injectable()
export class SocialLinksGaService extends BaseGaService {

  constructor(gaService: GoogleAnalyticsService) {
    super(gaService);
  }

  public registerEvents(element: HTMLElement) {

    this.addMutationObserver(
      '',
      (mutations) => {
        this.subscribeEvents(element);
      }, {
        subtree: true,
        childList: true
      },
      element);
  }

  public subscribeEvents(element?: HTMLElement) {
    this.clearAllEvents();

    var sendEvent = (evtCat: string, event: string, label?: string, value?: number) =>
      this.gaService.sendEvent(evtCat, event, label, value);

    var getLabel = (event: JQuery.ClickEvent) => {
      var name = $(event.currentTarget.closest(".social-button")).attr("name");
      if (event.currentTarget.closest("app-desktop-header .like-item"))
        return `_desktop_header_like_${name}_`;
      if (event.currentTarget.closest("app-mobile-header app-nav-menu .social-links"))
        return `_mobile_menu_like_${name}_`;
      if (event.currentTarget.closest("app-mobile-header app-nav-menu .social-share"))
        return `_mobile_menu_share_${name}_`;
      if (event.currentTarget.closest("app-desktop-header .share-item"))
        return `_desktop_header_share_${name}_`;
      if (event.currentTarget.closest("app-mobile-header .share-header"))
        return `_mobile_header_share_${name}_`;
      if (event.currentTarget.closest("app-footer"))
        return `_footer_like_${name}_`;
      return "";
    }

    this.addEvent(
      $(element).find(".share-link"),
      "click", (event: JQuery.ClickEvent) => {
        var label = getLabel(event);
        sendEvent(SocialLinksEvtCat.NAME, SocialLinksEvtCat.socialClick, label);
      }
    );
  }
}

enum SocialLinksEvtCat {
  NAME = "social-links",
  socialClick = "socialClick"
}
