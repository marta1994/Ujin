import { Component, OnInit, Input } from '@angular/core';
import { ICatalogModel } from 'src/app/services/catalog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-model-link',
  templateUrl: './model-link.component.html',
  styleUrls: ['./model-link.component.less']
})
export class ModelLinkComponent implements OnInit {

  @Input()
  public model: ICatalogModel;

  constructor(private readonly _translateService: TranslateService) { }

  ngOnInit() {
  }

  public get link(): string {
    return this.model ? `/${this._translateService.currentLang}/model/${this.model.identifier}` : "";
  }

  public get imgLink(): string {
    return this.model ? `/assets/images/${this.model.imagePath}` : "";
  }

}
