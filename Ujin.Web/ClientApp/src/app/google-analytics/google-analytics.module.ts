import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { GaService } from './ga.service';
import { GaProdService } from './ga-prod.service';
import { GaDevService } from './ga-dev.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: GaService,
      useClass: environment.production ? GaProdService : GaDevService
    }
  ]
})
export class GoogleAnalyticsModule { }
