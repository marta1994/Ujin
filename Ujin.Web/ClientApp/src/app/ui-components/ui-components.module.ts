import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SocialComponent } from './social/social.component';
import { ServicesModule } from '../services/services.module';
import { HeaderComponent } from './header/header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations:
    [
      SliderComponent,
      SocialComponent,
      HeaderComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ServicesModule,
    AngularSvgIconModule,
    TranslateModule.forChild()
  ],
  exports: [
    SliderComponent,
    SocialComponent,
    HeaderComponent
  ]
})
export class UiComponentsModule { }
