import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsService } from './app-settings.service';
import { ApiModule } from '../api/api.module';
import { DeviceService } from './device.service';
import { ClipboardService } from './clipboard.service';
import { LocalStorageService } from './local-storage.service';
import { CartService } from './cart.service';
import { ModelService } from './model.service';
import { ArrayService } from './array.service';
import { OrderService } from './order.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule
  ],
  providers: [
    AppSettingsService,
    DeviceService,
    ClipboardService,
    LocalStorageService,
    CartService,
    ModelService,
    ArrayService,
    OrderService
  ]
})
export class ServicesModule { }
