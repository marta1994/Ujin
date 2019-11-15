import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-size-measure',
    templateUrl: './size-measure.component.html',
    styleUrls: ['./size-measure.component.less']
})
export class SizeMeasureComponent implements OnInit {

    public textSnippets = [
        {
            order: 1,
            title: "forms.sizeMeasure.title1",
            text: "forms.sizeMeasure.text1"
        },
        {
            order: 2,
            title: "forms.sizeMeasure.title2",
            text: "forms.sizeMeasure.text2"
        },
        {
            order: 3,
            title: "forms.sizeMeasure.title3",
            text: "forms.sizeMeasure.text3"
        }
    ];

    constructor(
        private readonly _seoService: SeoService,
        private readonly _translateService: TranslateService,
        private readonly _router: Router) {
        this.setMeta();
    }

    private setMeta() {
        this._translateService.get('forms.navMenu.sizeMeasure')
            .subscribe(res => {
                this._seoService.updateTitle(res);
            });
        this._seoService.updateOgImage();
        const urlTree = this._router.parseUrl(this._router.url);
        const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
        this._seoService.updateOgUrl(urlWithoutParams);
    }

    ngOnInit() {
    }

}
