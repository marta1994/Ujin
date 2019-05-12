import { Component, ChangeDetectorRef } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { ScreenOrientationService, ScreenOrientation } from '../../services/screen-orientation.service';
import { WidgetSelectedStateService } from '../../services/widget-selected-state.service';
import { WidgetGaService } from '../../googleAnalytics/widget-ga.service';
import { PopupService } from '../../uiComponents/popup/popup.service';
import { BaseWidgetComponent, WidgetAnimations } from '../../uiComponents/widget/base-widget.component';
import { EnumService } from '../../services/enum.service';

@Component({
  selector: 'app-mobile-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
  providers: [  WidgetSelectedStateService ],
  animations: [
    WidgetAnimations.widgetImgTrigger,
    WidgetAnimations.bottomMenuTrigger
  ]
})
export class WidgetComponent extends BaseWidgetComponent {

  constructor(
     _widgetService: WidgetService,
    changeDetector: ChangeDetectorRef,
    selectedStateService: WidgetSelectedStateService,
    popupService: PopupService,
    gaService: WidgetGaService,
    _enumService: EnumService,
    private _screenOrientationService: ScreenOrientationService) {
    super(_widgetService, changeDetector, selectedStateService, popupService, gaService, _enumService);
  }

  public get imageSrc(): string {
    return this._widgetService.desktopImage;
  }

  public get sliderDirection(): string {
    return this._screenOrientationService.orientation === ScreenOrientation.Landscape ? "vertical" : "horizontal";
  }

  private get selectedSubIndex(): number {
    return this._selectedItem.subItems.findIndex(si => this.isSelected(si));
  }  

  public moveToNextConfig() {
    if (!this._selectedItem) return;
    var length = this._selectedItem.subItems.length;
    this.selectSubItem(this._selectedItem.subItems[(this.selectedSubIndex + 1) % length]);
  }

  public moveToPrevConfig() {
    if (!this._selectedItem) return;
    var length = this._selectedItem.subItems.length;
    this.selectSubItem(this._selectedItem.subItems[(length + this.selectedSubIndex - 1) % length]);
  }

  public showGemstoneInfo() {
    this.showGemstoneInfoOnWidth('100%');
  }
}

