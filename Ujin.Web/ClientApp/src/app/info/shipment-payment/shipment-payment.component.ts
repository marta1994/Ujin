import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shipment-payment',
    templateUrl: './shipment-payment.component.html',
    styleUrls: ['./shipment-payment.component.less']
})
export class ShipmentPaymentComponent implements OnInit {

    public textSnippets = [
        {
            title: "forms.shipment.title1",
            text: "forms.shipment.text1"
        },
        {
            title: "forms.shipment.title2",
            text: "forms.shipment.text2"
        },
        {
            title: "forms.shipment.title3",
            text: "forms.shipment.text3"
        }
    ];

    constructor(
        private readonly _seoService: SeoService,
        private readonly _translateService: TranslateService,
        private readonly _router: Router) {
        this.setMeta();
    }

    private setMeta() {
        this._translateService.get('forms.navMenu.shipmentPayment')
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
