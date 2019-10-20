import { Component, OnInit } from '@angular/core';
import { ICatalogModel, CatalogService } from 'src/app/services/catalog.service';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-all-models',
    templateUrl: './all-models.component.html',
    styleUrls: ['./all-models.component.less']
})
export class AllModelsComponent implements OnInit {

    public models: ICatalogModel[] = [];

    constructor(
        private _catalogService: CatalogService,
        private _seoService: SeoService,
        private _translateService: TranslateService,
        private _router: Router) {
        this._catalogService.loadCatalogModels()
            .then(models => this.models = models);
        this.setMeta();
    }

    ngOnInit() {
    }

    private setMeta() {
        this._translateService.get('forms.navMenu.catalog')
            .subscribe(res => {
                this._seoService.updateTitle(res);
            });
        this._seoService.updateOgImage();
        const urlTree = this._router.parseUrl(this._router.url);
        const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
        this._seoService.updateOgUrl(urlWithoutParams);
    }

    public sortByPrice(ascending: boolean) {
        this.models = this.models.sort((mod1, mod2) => (ascending ? 1 : -1) * (mod1.price - mod2.price));
    }
}
