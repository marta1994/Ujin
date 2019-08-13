import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllModelsComponent } from './all-models/all-models.component';
import { ModelLinkComponent } from './model-link/model-link.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AllModelsComponent, ModelLinkComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServicesModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    AllModelsComponent
  ]
})
export class AllModelsModule { }
