import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [SliderComponent],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule.forChild()
    ],
    exports: [
        SliderComponent
    ]
})
export class UiComponentsModule { }
