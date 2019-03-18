import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    SliderRegularComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    TranslationModule.forRoot(l10nConfig),
    InlineSVGModule
  ],
  providers: [
    DataLoaderService,
    WidgetService,
    WindowScrollService,
    ScreenOrientationService,
    SliderHelperService,
    SliderDirectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
