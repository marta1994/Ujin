import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../model.service';
import { JewelryModel } from '../models';

@Component({
    selector: 'app-model-widget',
    templateUrl: './model-widget.component.html',
    styleUrls: ['./model-widget.component.less']
})
export class ModelWidgetComponent implements OnInit {

    public model: JewelryModel;

    public imageIndexes: number[];

    constructor(
        private _modelService: ModelService,
        private _activatedRoute: ActivatedRoute) {
        let sku = this._activatedRoute.snapshot.queryParamMap.get('sku');
        let identifier = this._activatedRoute.snapshot.params['id'];
        _modelService.loadModel(identifier, sku).then(model => {
            this.model = model;
            this.imageIndexes = [];
            for (let i = 0; i < model.imagesCount; ++i)
                this.imageIndexes.push(i);
        });
    }

    ngOnInit() {
    }

    public getImgSrc(index: number): string {
        return `api/JewelryModel/WidgetImage/?sku=${this.model.sku}&index=${index}`;
    }

}
