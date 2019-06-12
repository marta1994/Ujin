import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { JewelryModelService } from './jewelry-model.service';
import { JewelryModelsComponent } from './jewelry-models/jewelry-models.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { ApiModule } from 'src/app/api/api.module';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UiComponentsModule } from 'src/app/ui-components/ui-components.module';
import { JewelryContainerComponent } from './jewelry-container.component';
import { EnumService } from 'src/app/services/enum.service';
import { NumberEditorComponent } from './model-config-editors/number-editor/number-editor.component';
import { OptionsEditorComponent } from './model-config-editors/options-editor/options-editor.component';
import { ImagesEditorComponent } from './model-config-editors/images-editor/images-editor.component';

export class JewelryModelRouteProvider {
  public static getRoutes(): Route[] {
    return [
      {
        path: 'jewelry-models',
        component: JewelryContainerComponent,
        children: [
          {
            path: 'models',
            component: JewelryModelsComponent
          },
          {
            path: 'jewelry-model-editor/:id',
            component: ModelEditorComponent
          },
          { path: '**', redirectTo: 'models' }
        ]
      }
    ];
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
    AngularSvgIconModule,
    UiComponentsModule
  ],
  providers: [
    JewelryModelService,
    EnumService
  ],
  declarations: [
    JewelryModelsComponent,
    ModelEditorComponent,
    JewelryContainerComponent,
    NumberEditorComponent,
    OptionsEditorComponent,
    ImagesEditorComponent
  ]
})
export class JewelryModelModule { }
