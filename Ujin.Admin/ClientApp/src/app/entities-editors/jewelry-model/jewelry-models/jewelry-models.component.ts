import { Component, OnInit } from '@angular/core';
import { JewelryModelService } from '../jewelry-model.service';
import { JewelryModel } from '../models';
import { ITableConfig, ColumnType, IActionColumn } from 'src/app/ui-components/table/table.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jewelry-models',
  templateUrl: './jewelry-models.component.html',
  styleUrls: ['./jewelry-models.component.less']
})
export class JewelryModelsComponent implements OnInit {

  public jewelryModels: JewelryModel[];

  constructor(
    private _jewelryModelService: JewelryModelService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._jewelryModelService.loadJewelryModels()
      .then(models => this.jewelryModels = models)
      .catch(err => alert("Помилка при завантаженні " + err));
  }

  public get tableConfig(): ITableConfig {
    return {
      columnsConfig: [
        {
          columnNameKey: "ID",
          isEditable: false,
          displayPropertyName: "id",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Ключ назви",
          isEditable: false,
          displayPropertyName: "nameKey",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Назва зі словника",
          isEditable: false,
          displayPropertyName: "nameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Стан моделі",
          isEditable: false,
          displayPropertyName: "modelStateNameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Редагування",
          isEditable: false,
          displayPropertyName: "",
          isTranslated: false,
          isOrderable: false,
          columnType: ColumnType.Action,
          columnOptions: <IActionColumn>{
            action: (item: JewelryModel) =>
              this._router.navigate(['../jewelry-model-editor', item.id], { relativeTo: this._activatedRoute }),
            text: "Редагувати",
            isActionAllowed: (item: JewelryModel) => true
          }
        }
      ]
    }
  }

  public addNew() {
    this._router.navigate(['../jewelry-model-editor', -1], { relativeTo: this._activatedRoute });
  }
}
