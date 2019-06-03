import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JewelryModel } from '../models';
import { JewelryModelService } from '../jewelry-model.service';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.less']
})
export class ModelEditorComponent implements OnInit {

  public jewelryModel: JewelryModel;

  constructor(
    private _route: ActivatedRoute,
    private _jewelryModelService: JewelryModelService) { }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get("id");
    if (id > 0) {
      this._jewelryModelService.loadJewelryModel(id)
        .then(m => this.jewelryModel = m)
        .catch(error => alert("Помилка при завантаженні " + error));
    } else {
      this.jewelryModel = new JewelryModel({
        id: -1,
        nameKey: "jewelryModel.name.NEW_NAME",
        basePrice: 0,
        imagesPattern: "[]",
        priceExpression: "0",
        configurations: []
      });
    }
  }

}
