import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GemstoneComponent } from './gemstone.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../../api/api.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { NamedEntityEditorComponent } from './named-entity-editor/named-entity-editor.component';
import { GemInstanceComponent } from './gem-instance/gem-instance.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ApiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UiComponentsModule
  ],
  declarations: [
    NamedEntityEditorComponent,
    GemstoneComponent,
    GemInstanceComponent
  ]
})
export class GemstoneModule { }
