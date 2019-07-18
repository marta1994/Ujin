import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { JewelryModel, SkuDescription } from '../models';
import { AppSettingsService } from '../../services/app-settings.service';

@Component({
    selector: 'app-vertical-img-collage',
    templateUrl: './vertical-img-collage.component.html',
    styleUrls: ['./vertical-img-collage.component.less']
})
export class VerticalImgCollageComponent implements OnInit, OnChanges {

    @Input()
    public model: JewelryModel;

    @Input()
    public sku: string;

    public images: string[] = [];

    private _skuSeparator: string;

    constructor(private _appSettingsService: AppSettingsService) { }

    ngOnInit() {
        this._appSettingsService.loadTerms().then(res => this._skuSeparator = res.skuSeparator);
    }

    ngOnChanges() {
        this.sortImages();
    }

    private sortImages() {
        if (!this._skuSeparator || !this.model || !this.sku) return;
        let sortedSkuData = this.model.skuDescriptions.sort((s1, s2) => this.compareSkuData(s1, s2));
        this.images = [];
        sortedSkuData.forEach(sk => sk.images.forEach(img => this.images.push("assets/images/sku/" + img)));
    }

    private compareSkuData(sku1: SkuDescription, sku2: SkuDescription): number {
        return this.getDistFromCurrSku(sku1.sku) - this.getDistFromCurrSku(sku2.sku);
    }

    private getDistFromCurrSku(sku: string): number {
        let currSeparated = this.sku.split(this._skuSeparator);
        let comparSeparated = sku.split(this._skuSeparator);
        if (currSeparated.length != comparSeparated.length) return 10000;
        let res = 0;
        for (let i = 0; i < currSeparated.length; ++i) {
            if (currSeparated[i] == comparSeparated[i] || !isNaN(+comparSeparated[i])) continue;
            if (currSeparated[i].indexOf("-") < 0) {
                res += 10;
                continue;
            }
            let splitted1 = currSeparated[i].split("-");
            let splitted2 = comparSeparated[i].split("-");
            for (let j = 0; j < splitted1.length; ++j) {
                if (splitted1[j] != splitted2[j]) res++;
            }
        }
        return res;
    }
}
