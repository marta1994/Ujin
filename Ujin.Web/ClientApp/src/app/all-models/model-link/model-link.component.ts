import { Component, OnInit, Input } from '@angular/core';
import { ICatalogModel, ProductLabel } from 'src/app/services/catalog.service';
import { TranslateService } from '@ngx-translate/core';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, CatalogEvents } from 'src/app/google-analytics/events';

@Component({
    selector: 'app-model-link',
    templateUrl: './model-link.component.html',
    styleUrls: ['./model-link.component.less']
})
export class ModelLinkComponent implements OnInit {

    private _model: ICatalogModel;
    
    public get model(): ICatalogModel {
        return this._model;
    }
    @Input()
    public set model(val: ICatalogModel) {
        if (this._model === val) return;
        this._model = val;
        this.setTranslatedValues();
    }

    public translatedName: string;

    public translatedDescription: string;

    public ProductLabel = ProductLabel;

    constructor(
        private readonly _translateService: TranslateService,
        private readonly _gaService: GaService) { }

    ngOnInit() {
    }

    public get link(): string {
        return this.model ? `/${this._translateService.currentLang}/model/${this.model.modelIdentifier}` : "";
    }

    public get imgLink(): string {
        return this.model ? `/assets/images/sku/${this.model.imagePath}` : "";
    }

    public modelClick() {
        this._gaService.sendEvent(EventCategory.Catalog, CatalogEvents.ModelClick, this.link + "?sku=" + this.model.sku);
    }

    private setTranslatedValues() {
        var allKeys = this.model.displayNameParts.concat(this.model.descriptionParts);
        this._translateService.get(allKeys)
            .subscribe(translated => {
                var names = this.model.displayNameParts.map(name => translated[name]);
                var descriptions = this.model.descriptionParts.map(desc => translated[desc]);
                this.translatedName = names[names.length - 1];
                this.translatedDescription = descriptions.join(", ");
            });
    }

    public get label(): ProductLabel {
        if (this._model.productLabel & ProductLabel.TopSells) {
            return ProductLabel.TopSells;
        }
        if (this._model.productLabel & ProductLabel.NewProduct) {
            return ProductLabel.NewProduct;
        }
        return 0;
    }
}
