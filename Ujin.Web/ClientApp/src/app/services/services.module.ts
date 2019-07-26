import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsService } from './app-settings.service';
import { ApiModule } from '../api/api.module';
import { DeviceService } from './device.service';
import { ClipboardService } from './clipboard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule
  ],
  providers: [
    AppSettingsService,
    DeviceService,
    ClipboardService
  ]
})
export class ServicesModule { }
