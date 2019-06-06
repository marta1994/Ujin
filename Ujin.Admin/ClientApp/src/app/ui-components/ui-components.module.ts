import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { CollapsiblePanelComponent } from './collapsible-panel/collapsible-panel.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DoublePanelComponent } from './double-panel/double-panel.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ColorPickerModule,
    AngularSvgIconModule
  ],
  declarations: [
    TableComponent,
    CollapsiblePanelComponent,
    DoublePanelComponent,
    SelectComponent
  ],
  exports: [
    TableComponent,
    CollapsiblePanelComponent,
    DoublePanelComponent,
    SelectComponent
  ]
})
export class UiComponentsModule { }
