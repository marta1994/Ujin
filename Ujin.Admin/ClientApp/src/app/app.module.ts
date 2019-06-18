import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { AuthGuardService } from './authorization/auth-guard.service';
import { LoginComponent } from './authorization/login/login.component';
import { AuthorizationModule } from './authorization/authorization.module';
import { ApiModule } from './api/api.module';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { ColorEditorComponent } from './entities-editors/color-editor/color-editor.component';
import { MetalEditorComponent } from './entities-editors/metal-editor/metal-editor.component';
import { GemstoneRouteProvider, GemstoneModule } from './entities-editors/gemstone/gemstone.module';
import { JewelryModelRouteProvider, JewelryModelModule } from './entities-editors/jewelry-model/jewelry-model.module';
import { AppSettingsService } from './services/app-settings.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ContentComponent,
    ColorEditorComponent,
    MetalEditorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: '', component: HomeComponent },
          GemstoneRouteProvider.getRoute(),
          { path: 'color-edit', component: ColorEditorComponent },
          { path: 'metal-edit', component: MetalEditorComponent }
        ].concat(JewelryModelRouteProvider.getRoutes())
      },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ]),
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