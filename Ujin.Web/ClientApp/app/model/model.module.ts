import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelWidgetComponent } from './model-widget/model-widget.component';
import { ApiModule } from '../api/api.module';
import { ModelService } from './model.service';
import { WidgetComponent } from './widget/widget.component';
import { NumberConfigComponent } from './widget/number-config/number-config.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { SelectorConfigComponent } from './widget/selector-config/selector-config.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ModelInfoComponent, InfoNodeComponent } from './model-info/model-info.component';

@NgModule({
    declarations: [
        ModelWidgetComponent,
        WidgetComponent,
        NumberConfigComponent,
        SelectorConfigComponent,
        ModelInfoComponent,
        InfoNodeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ApiModule,
        UiComponentsModule,
        TranslateModule.forChild()
    ],
    providers: [
        ModelService
    ]
})
export class ModelModule { }
