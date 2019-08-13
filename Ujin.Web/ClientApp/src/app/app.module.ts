import { BrowserModule, BrowserTransferStateModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LangService } from './core/lang/lang.service';
import { AppComponent } from './core/app/app.component';
import { ModelModule } from './model/model.module';
import { LangComponent } from './core/lang/lang.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { OrderModule } from './order/order.module';
import { WrongPathComponent } from './core/wrong-path/wrong-path.component';
import { GoogleAnalyticsModule } from './google-analytics/google-analytics.module';
import { AllModelsModule } from './all-models/all-models.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export class FixVericalScrollHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LangComponent,
    WrongPathComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({
      appId: 'ujin' 
    }),
    HttpClientModule,
    BrowserTransferStateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    UiComponentsModule,
    OrderModule,
    AllModelsModule,
    AppRoutingModule,
    GoogleAnalyticsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateModule,
    LangService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: FixVericalScrollHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
