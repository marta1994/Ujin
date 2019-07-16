import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JewelryModel, SkuDescription } from '../models';
import { AppSettingsService } from '../../services/app-settings.service';
import { trigger, transition, useAnimation, sequence } from '@angular/animations';
import { fadeInRight, fadeInLeft } from 'ng-animate';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.less'],
    animations: [
        trigger('mainImg', [
            transition('* => outRight',
                useAnimation(fadeInLeft, { params: { timing: 0.3 } }),),
            transition('* => outLeft',
                useAnimation(fadeInRight, { params: { timing: 0.3 } })
                )])
    ]
})
export class ImageCarouselComponent implements OnInit, OnChanges {

    @Input()
    public model: JewelryModel;

    @Input()
    public sku: string;

    public imageIndexes: number[] = [];

    public images: string[] = [];

    private _skuSeparator: string;

    public currIndex = 0;

    public imgAnimate: ImageAnimate = ImageAnimate.none;

    constructor(private _appSettingsService: AppSettingsService) { }

    ngOnInit() {
        this._appSettingsService.loadTerms().then(res => this._skuSeparator = res.skuSeparator);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.model && this.model) {
            this.imageIndexes = [];
            this.model.skuDescriptions.forEach(sk => {
                sk.images.forEach(() => this.imageIndexes.push(this.imageIndexes.length));
            });
        }
        this.sortImages();
    }

    public imgAnimateDone() {
        this.imgAnimate = ImageAnimate.none;
    }
    
    public shift(pos: number) {
        this.currIndex = (this.currIndex + pos + this.images.length) % this.images.length;
        this.imgAnimate = pos > 0 ? ImageAnimate.outLeft : ImageAnimate.outRight;
    }

    private sortImages() {
        if (!this._skuSeparator || !this.model || !this.sku) return;
        let sortedSkuData = this.model.skuDescriptions.sort((s1, s2) => this.compareSkuData(s1, s2));
        this.images = [];
        this.currIndex = 0;
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

enum ImageAnimate {
    outRight = "outRight",
    outLeft = "outLeft",
    inRight = "inRight",
    inLeft = "inLeft",
    none = "none"
}
