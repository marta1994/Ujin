import { Component, OnInit } from '@angular/core';
import { ICatalogModel, CatalogService } from 'src/app/services/catalog.service';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GaService } from '../../google-analytics/ga.service';
import { EventCategory, CatalogEvents } from '../../google-analytics/events';
import { ArrayService } from '../../services/array.service';

@Component({
    selector: 'app-all-models',
    templateUrl: './all-models.component.html',
    styleUrls: ['./all-models.component.less']
})
export class AllModelsComponent implements OnInit {

    public filteredModels: ICatalogModel[];

    public sortFilterModel: SortFilterModel = { filterTags: [], priceSortOptions: SortOption.None };

    private _models: ICatalogModel[];

    public SortOption = SortOption;

    public 

    constructor(
        private readonly _catalogService: CatalogService,
        private readonly _seoService: SeoService,
        private readonly _translateService: TranslateService,
        private readonly _gaService: GaService,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _router: Router,
        private readonly _arrayService: ArrayService) {
        this._catalogService.loadCatalogModels()
            .then(models => {
                this._models = models;
                this.filteredModels = models;
                this.init();
            });
        this.setMeta();
        this._activatedRoute.queryParams.subscribe(() => {
            this.init();
        });
    }

    ngOnInit() {
    }

    public triggerSortByPrice(ascending: boolean) {
        var option = ascending ? 'asc' : 'desc';
        var sortOpt = option == this.sortFilterModel.priceSortOptions ? SortOption.None : option;
        this._gaService.sendEvent(EventCategory.Catalog, CatalogEvents.SortByPrice, sortOpt.toString());
        const queryParams: Params = { sort: `price_${sortOpt}` };
         
        this._router.navigate(
            [],
            {
                relativeTo: this._activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: "merge",
            });

        this.filterAndSort();
    }

    private init() {
        let tags = this._activatedRoute.snapshot.queryParamMap.get('tags');
        let sort = this._activatedRoute.snapshot.queryParamMap.get('sort');

        this.sortFilterModel = { filterTags: [], priceSortOptions: SortOption.None };

        if (tags) {
            tags = tags.toLowerCase();
            this.sortFilterModel.filterTags = this._arrayService.distinct(tags.split(",").map(t => t));
        }

        if (sort) {
            sort = sort.toLowerCase();
            var sortParams = sort.split(",");
            for (var sortParam of sortParams) {
                var propVal = sortParam.split("_");
                var sortProp = propVal[0] || "";
                var sortOption = (() => {
                    var val = propVal[1] && propVal[1];
                    if (!val) return SortOption.None;
                    switch (val) {
                        case "asc":
                            return SortOption.Ascending;
                        case "desc":
                            return SortOption.Descending;
                        default:
                            return SortOption.None;
                    }
                })();
                switch (sortProp) {
                    case "price":
                        this.sortFilterModel.priceSortOptions = sortOption;
                        break;
                }
            }
        }

        this.filterAndSort();
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

    private filterAndSort() {
        if (!this._models) return;
        this.filteredModels = this._models;
        this.filterByTags();
        this.sort();
    }

    private filterByTags() {
        this.filteredModels = this.filteredModels
            .filter(m => this._arrayService.intersect(m.tags, this.sortFilterModel.filterTags).length === this.sortFilterModel.filterTags.length);
    }

    private sort() {
        if (this.sortFilterModel.priceSortOptions) {
            this.sortByPrice(this.sortFilterModel.priceSortOptions === SortOption.Ascending);
        }
    }

    private sortByPrice(ascending: boolean) {
        this.filteredModels = this.filteredModels.sort((mod1, mod2) => (ascending ? 1 : -1) * (mod1.price - mod2.price));        
    }
}

interface SortFilterModel {
    filterTags: string[];
    priceSortOptions: SortOption;
}

enum SortOption {
    None = 0,
    Ascending = "asc",
    Descending = "desc"
}
