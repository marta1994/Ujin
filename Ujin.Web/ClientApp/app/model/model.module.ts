import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelWidgetComponent } from './model-widget/model-widget.component';
import { ApiModule } from '../api/api.module';
import { ModelService } from './model.service';


@NgModule({
    declarations: [
        ModelWidgetComponent
    ],
    imports: [
        CommonModule,
        ApiModule
    ],
    providers: [
        ModelService
    ]
})
export class ModelModule { }
