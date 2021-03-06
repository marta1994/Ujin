import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelPageComponent } from './model-page/model-page.component';
import { ApiModule } from '../api/api.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { WidgetComponent } from './widget/widget.component';
import { NumberConfigComponent } from './widget/number-config/number-config.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { SelectorConfigComponent } from './widget/selector-config/selector-config.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ServicesModule } from '../services/services.module';
import { VerticalImgCollageComponent } from './vertical-img-collage/vertical-img-collage.component';

@NgModule({
  declarations: [
    ModelPageComponent,
    WidgetComponent,
    NumberConfigComponent,
    SelectorConfigComponent,
    ImageCarouselComponent,
    VerticalImgCollageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ApiModule,
    UiComponentsModule,
    ServicesModule,
    AngularSvgIconModule,
    TranslateModule.forChild()
  ],
  providers: [
  ]
})
export class ModelModule { }
