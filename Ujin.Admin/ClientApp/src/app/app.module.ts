import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { AuthorizationModule } from './authorization/authorization.module';
import { ApiModule } from './api/api.module';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { ColorEditorComponent } from './entities-editors/color-editor/color-editor.component';
import { MetalEditorComponent } from './entities-editors/metal-editor/metal-editor.component';
import { GemstoneModule } from './entities-editors/gemstone/gemstone.module';
import { JewelryModelModule } from './entities-editors/jewelry-model/jewelry-model.module';
import { AppSettingsService } from './services/app-settings.service';
import { AppRoutingModule } from './app-routing.module';
import { SkuConfigComponent, InfoNodeComponent } from './sku-config/sku-config.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ContentComponent,
    ColorEditorComponent,
    MetalEditorComponent,
    SkuConfigComponent,
    InfoNodeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ApiModule,
    AuthorizationModule,
    GemstoneModule,
    JewelryModelModule,
    UiComponentsModule
  ],
  providers: [
    AppSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
