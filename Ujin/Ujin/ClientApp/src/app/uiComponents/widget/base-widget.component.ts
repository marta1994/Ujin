import { ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { trigger, useAnimation, transition, state, style, animate } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { WidgetSelectedStateService, ImgAnimateState } from "../../services/widget-selected-state.service";
import { MenuItem, MenuConfig, WidgetService, GemstoneOption } from "../../services/widget.service";
import { PopupService } from "../popup/popup.service";
import { WidgetGaService } from "../../googleAnalytics/widget-ga.service";
import { PlainTextComponent } from "../plain-text/plain-text.component";
import { EnumService, EnumKeyValue } from "../../services/enum.service";

export abstract class BaseWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
  public menuItems: MenuItem[];
  public configuration: MenuConfig[];
  protected _selectedItem: MenuItem;
  private _gemstoneOptions: EnumKeyValue[];

  constructor(
    protected _widgetService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    public selectedStateService: WidgetSelectedStateService,
    private popupService: PopupService,
    private gaService: WidgetGaService,
    private _enumService: EnumService) { }

  ngOnInit() {
    this._widgetService.loadMenuItems()
      .subscribe(
        data => {
          this.menuItems = data;
          this.selectItem(this.menuItems[2]);
          this.configuration = this._widgetService.configuration;
        },
        error => console.log(error));
    this.selectedStateService.init(
      () => this.configSelected,
      () => this.changeDetector.detectChanges(),
      () => this.imageSrc);
    this._gemstoneOptions = this._enumService.getEnumStrKeyIntValuesLowerCase(GemstoneOption);
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public abstract get imageSrc(): string;

  public get sliderConfig() {
    return WidgetService.SIZE_CONFIG;
  }

  public get selectedItem(): MenuItem {
    return this._selectedItem;
  }

  public get gemstoneName(): string {
    return WidgetService.GEMSTONE_KEY;
  }

  public get gemstoneOption(): GemstoneOption {
    return this._widgetService.gemstoneOptionItem ? this._widgetService.gemstoneOptionItem.value : false;
  }

  public set gemstoneOption(val: GemstoneOption) {
    if (this._widgetService.gemstoneOptionItem) {
      this._widgetService.gemstoneOptionItem.value = val;
    }
  }

  public get gemstoneOptions(): EnumKeyValue[] {
    return this._gemstoneOptions;
  }

  public get sliderValue(): number {
    return this.configuration.find(c => c.nameKey === WidgetService.SIZE_CONFIG.nameKey)
      .value;
  }

  public set sliderValue(val: number) {
    this.configuration.find(c => c.nameKey === WidgetService.SIZE_CONFIG.nameKey)
      .value = val;
  }

  public selectItem(item: MenuItem) {
    this._selectedItem = item;
  }

  protected get configSelected(): MenuConfig {
    return this.configuration.find(it => it.nameKey === this._selectedItem.nameKey);
  }

  public selectSubItem(item: MenuItem) {
    this.selectedStateService.selectSubItem(item);
  }

  public get imgAnimate(): ImgAnimateState {
    return this.selectedStateService.imgAnimate;
  }

  public imgAnimateDone(event) {
    this.selectedStateService.imgAnimateDone(event);
  }

  public onImageLoded() {
    this.selectedStateService.onImageLoded();
  }

  public isSelected(item: MenuItem): boolean {
    if (item === this._selectedItem)
      return true;
    for (let conf of this.configuration) {
      if (conf.value === item)
        return true;
    }
    return false;
  }

  public getSelectedSubMenu(): MenuItem[] {
    return this._selectedItem ? this._selectedItem.subItems : null;
  }

  protected showGemstoneInfoOnWidth(width: string) {
    this.popupService.open(PlainTextComponent, { showCloseButton: true, width: width }, { inputData: { textKey: 'widget.gemstone.story' } });
  }

  public abstract showGemstoneInfo();
}

export const WidgetAnimations = {

  widgetImgTrigger: trigger('widgetImg', [
    transition('* => out',
      useAnimation(fadeOut, { params: { timing: 0.3 } })),
    transition('* => in',
      useAnimation(fadeIn, { params: { timing: 0.3 } })),
    state('loading', style({
      opacity: 0
    })),
    transition('* => loading', [animate(0.3)])]),


  bottomMenuTrigger: trigger('bottomMenu', [
    transition('* => *',
      animate('0.3s ease', style({
        boxShadow: '0 2px 2px 0 #f5f5f5'
      })),
    )])
};
