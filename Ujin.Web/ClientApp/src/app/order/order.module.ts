import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { ServicesModule } from '../services/services.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    UiComponentsModule,
    ServicesModule,
    AngularSvgIconModule,
    TranslateModule.forChild()
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule { }
