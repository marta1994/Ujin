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

import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';
import { DesktopComponent } from './desktop/desktop.component';
import { WidgetComponent } from './mobile/widget/widget.component';
import { SliderComponent } from './uiComponents/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    DesktopComponent,
    WidgetComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    TranslationModule.forRoot(l10nConfig),
    InlineSVGModule.forRoot()
  ],
  providers: [
    DataLoaderService,
    WidgetService,
    WindowScrollService,
    ScreenOrientationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
