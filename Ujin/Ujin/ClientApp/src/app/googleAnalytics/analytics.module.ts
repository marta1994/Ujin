import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './../../environments/environment';
import { GoogleAnalyticsService } from './google-analytics.service';
import { GoogleAnalyticsProdService } from './google-analytics-prod.service';
import { GoogleAnalyticsDevService } from './google-analytics-dev.service';
import { WidgetGaService } from './widget-ga.service';
import { CallButtonGaService } from './call-button-ga.service';
import { CallMeGaService } from './call-me-ga.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: GoogleAnalyticsService,
      useClass: environment.production ? GoogleAnalyticsProdService : GoogleAnalyticsDevService
    },
    WidgetGaService,
    CallButtonGaService,
    CallMeGaService
  ],
  declarations: [],
  exports: [
  ]
})
export class AnalyticsModule { }
