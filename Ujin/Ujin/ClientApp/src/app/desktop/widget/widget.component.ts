import { Component, ChangeDetectorRef } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetSelectedStateService } from '../../services/widget-selected-state.service';
import { WidgetGaService } from '../../googleAnalytics/widget-ga.service';
import { PopupService } from '../../uiComponents/popup/popup.service';
import { WidgetAnimations, BaseWidgetComponent } from '../../uiComponents/widget/base-widget.component';
import { EnumService } from '../../services/enum.service';

@Component({
  selector: 'app-desktop-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
  providers: [ WidgetSelectedStateService ],
  animations: [
    WidgetAnimations.widgetImgTrigger
  ]
})
export class WidgetComponent extends BaseWidgetComponent {

  constructor(
    _widgetService: WidgetService,
    changeDetector: ChangeDetectorRef,
    selectedStateService: WidgetSelectedStateService,
    popupService: PopupService,
    gaService: WidgetGaService,
    _enumService: EnumService) {
    super(_widgetService, changeDetector, selectedStateService, popupService, gaService, _enumService);
  }

  public get imageSrc(): string {
    return this._widgetService.desktopImage;
  }

  public showGemstoneInfo() {
    this.showGemstoneInfoOnWidth('900px');
  }
}
