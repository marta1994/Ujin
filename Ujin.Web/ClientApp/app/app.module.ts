import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine/tokens';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangService } from './core/lang/lang.service';
import { AppComponent } from './core/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModelModule } from './model/model.module';
import { LangComponent } from './core/lang/lang.component';

export function createTranslateLoader(http: HttpClient, baseHref) {
  // Temporary Azure hack
  if (baseHref === null && typeof window !== 'undefined') {
    baseHref = window.location.origin;
  }
  // i18n files are in `wwwroot/assets/`
  return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LangComponent
    ],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({
            appId: 'my-app-id' // make sure this matches with your Server NgModule
        }),
        HttpClientModule,
        TransferHttpCacheModule,
        BrowserTransferStateModule,
        FormsModule,
        ReactiveFormsModule,
        ModelModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient, [ORIGIN_URL]]
            }
        })
    ],
    providers: [
        TranslateModule,
        LangService
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {}
