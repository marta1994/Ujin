import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GemstoneComponent } from './entities-editors/gemstone/gemstone.component';
import { GemInstanceComponent } from './entities-editors/gemstone/gem-instance/gem-instance.component';
import { NamedEntityEditorComponent } from './entities-editors/gemstone/named-entity-editor/named-entity-editor.component';
import { JewelryContainerComponent } from './entities-editors/jewelry-model/jewelry-container.component';
import { JewelryModelsComponent } from './entities-editors/jewelry-model/jewelry-models/jewelry-models.component';
import { ModelEditorComponent } from './entities-editors/jewelry-model/model-editor/model-editor.component';
import { ContentComponent } from './content/content.component';
import { AuthGuardService } from './authorization/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ColorEditorComponent } from './entities-editors/color-editor/color-editor.component';
import { MetalEditorComponent } from './entities-editors/metal-editor/metal-editor.component';
import { LoginComponent } from './authorization/login/login.component';
import { SkuConfigComponent } from './sku-config/sku-config.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: HomeComponent },
      {
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
      },
      { path: 'color-edit', component: ColorEditorComponent },
      { path: 'metal-edit', component: MetalEditorComponent },
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
      },
      {
        path: 'sku-config', component: SkuConfigComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
