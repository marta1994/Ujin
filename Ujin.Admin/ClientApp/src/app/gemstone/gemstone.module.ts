import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GemstoneComponent } from './gemstone.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NamedEntityEditorComponent } from './named-entity-editor/named-entity-editor.component';
import { GemInstanceComponent } from './gem-instance/gem-instance.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

export class GemstoneRouteProvider {
  public static getRoute(): Route {
    return {
      path: 'gemstone',
      component: GemstoneComponent,
      children: [
        {
          path: 'gemstone',
          component: GemInstanceComponent
        },
        {
          path: 'gem-class',
          component: NamedEntityEditorComponent,
          data: {
            placeholder: "Тип каменя (сапфір, рубін, жовтий сапфір, ...)",
            entityType: "GemClasses"
          }
        },
        {
          path: 'gem-cut',
          component: NamedEntityEditorComponent,
          data: {
            placeholder: "Ограновування каменя (овал, квадрат, ...)",
            entityType: "GemCuts"
          }
        },
        {
          path: 'gem-source',
          component: NamedEntityEditorComponent,
          data: {
            placeholder: "Походження каменю (натуральний, вироблений, ...)",
            entityType: "GemSources"
          }
        },
        { path: '**', redirectTo: 'gemstone' }
      ]
    };
  }
}

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
