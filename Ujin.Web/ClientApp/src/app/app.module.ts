import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LangService } from './core/lang/lang.service';
import { AppComponent } from './core/app/app.component';
import { ModelModule } from './model/model.module';
import { LangComponent } from './core/lang/lang.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LangComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({
      appId: 'ujin' 
    }),
    HttpClientModule,
    BrowserTransferStateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateModule,
    LangService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
