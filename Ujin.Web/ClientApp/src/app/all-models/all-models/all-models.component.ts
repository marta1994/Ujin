import { Component, OnInit } from '@angular/core';
import { ICatalogModel, CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-all-models',
  templateUrl: './all-models.component.html',
  styleUrls: ['./all-models.component.less']
})
export class AllModelsComponent implements OnInit {

  public models: ICatalogModel[] = [];

  constructor(private _catalogService: CatalogService) {
    this._catalogService.loadCatalogModels()
      .then(models => this.models = models);
  }

  ngOnInit() {
  }

}
