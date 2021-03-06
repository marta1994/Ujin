import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SocialComponent } from './social/social.component';
import { ServicesModule } from '../services/services.module';
import { HeaderComponent } from './header/header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { ModelInfoComponent, InfoNodeComponent } from './model-info/model-info.component';
import { InputComponent } from './input/input.component';
import { AdventagesComponent } from './adventages/adventages.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations:
        [
            SliderComponent,
            SocialComponent,
            HeaderComponent,
            FooterComponent,
            MenuComponent,
            ModelInfoComponent,
            InfoNodeComponent,
            InputComponent,
            AdventagesComponent,
            LoadingComponent
        ],
    imports: [
        CommonModule,
        FormsModule,
        ServicesModule,
        AngularSvgIconModule,
        TranslateModule.forChild(),
        RouterModule.forChild([])
    ],
    exports: [
        SliderComponent,
        SocialComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        ModelInfoComponent,
        InputComponent,
        AdventagesComponent,
        LoadingComponent
    ]
})
export class UiComponentsModule { }
