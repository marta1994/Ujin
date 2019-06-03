import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { JewelryModelService } from './jewelry-model.service';
import { JewelryModelsComponent } from './jewelry-models/jewelry-models.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from 'src/app/api/api.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UiComponentsModule } from 'src/app/ui-components/ui-components.module';
import { HttpClient } from '@angular/common/http';
import { JewelryContainerComponent } from './jewelry-container.component';

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
    UiComponentsModule
  ],
  providers: [JewelryModelService],
  declarations: [JewelryModelsComponent, ModelEditorComponent, JewelryContainerComponent]
})
export class JewelryModelModule { }
