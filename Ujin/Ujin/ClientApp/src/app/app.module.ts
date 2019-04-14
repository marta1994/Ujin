import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { L10nLoader, TranslationModule } from 'angular-l10n';
import { l10nConfig } from './configs/localization.config';
import { InlineSVGModule } from 'ng-inline-svg';

import { DataLoaderService } from './api/data-loader.service';
import { WidgetService } from './services/widget.service';
import { WindowScrollService } from './services/window-scroll.service';
import { ScreenOrientationService } from './services/screen-orientation.service';
import { SliderHelperService } from './uiComponents/slider/slider-helper.service';
import { SliderDirectionService } from './uiComponents/slider/slider-direction.service';
import { PopupService } from './uiComponents/popup/popup.service';
import { RingInfoService } from './services/ring-info.service';
import { EmailValidatorService } from './services/email-validator.service';
import { PhoneValidatorService } from './services/phone-validator.service';
import { OrderService } from './services/order.service';
import { SocialService } from './services/social.service';
import { DeviceTypeService } from './services/device-type.service';
import { EnumService } from './services/enum.service';

import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';
import { DesktopComponent } from './desktop/desktop.component';
import { WidgetComponent as MobileWidgetComponent } from './mobile/widget/widget.component';
import { WidgetComponent as DesktopWidgetComponent } from './desktop/widget/widget.component';
import { SliderComponent } from './uiComponents/slider/slider.component';
import { HeaderComponent as MobileHeaderComponent } from './mobile/header/header.component';
import { HeaderComponent as DesktopHeaderComponent } from './desktop/header/header.component';
import { NavMenuComponent } from './mobile/nav-menu/nav-menu.component';
import { CounterComponent } from './uiComponents/counter/counter.component';
import { SliderRegularComponent } from './uiComponents/slider-regular/slider-regular.component';
import { FixedCallButtonComponent } from './uiComponents/fixed-call-button/fixed-call-button.component';
import { PopupComponent } from './uiComponents/popup/popup.component';
import { InsertionDirective } from './uiComponents/popup/insertion.directive';
import { CallMeComponent } from './uiComponents/fixed-call-button/call-me/call-me.component';
import { InputComponent } from './uiComponents/input/input.component';
import { RingInfoComponent } from './uiComponents/ringInfo/ring-info.component';
import { OrderComponent } from './uiComponents/order/order.component';
import { AnalyticsModule } from './googleAnalytics/analytics.module';
import { PlainTextComponent } from './uiComponents/plain-text/plain-text.component';
import { SocialShareComponent } from './uiComponents/social-share/social-share.component';
import { AdventagesComponent } from './uiComponents/adventages/adventages.component';

export class FixVericalScrollHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    DesktopComponent,
    MobileWidgetComponent,
    DesktopWidgetComponent,
    SliderComponent,
    MobileHeaderComponent,
    DesktopHeaderComponent,
    NavMenuComponent,
    CounterComponent,
    SliderRegularComponent,
    FixedCallButtonComponent,
    PopupComponent,
    InsertionDirective,
    CallMeComponent,
    InputComponent,
    RingInfoComponent,
    OrderComponent,
    PlainTextComponent,
    SocialShareComponent,
    AdventagesComponent
  ],
  entryComponents: [
    PopupComponent,
    CallMeComponent,
    OrderComponent,
    PlainTextComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    TranslationModule.forRoot(l10nConfig),
    InlineSVGModule.forRoot({ baseUrl: '' }),
    AnalyticsModule
  ],
  providers: [
    DataLoaderService,
    WidgetService,
    WindowScrollService,
    ScreenOrientationService,
    SliderHelperService,
    SliderDirectionService,
    PopupService,
    RingInfoService,
    EmailValidatorService,
    PhoneValidatorService,
    OrderService,
    SocialService,
    DeviceTypeService,
    EnumService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: FixVericalScrollHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
