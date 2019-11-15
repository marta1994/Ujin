import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { OrderService } from 'src/app/services/order.service';
import { LangService } from 'src/app/core/lang/lang.service';

declare function fbq(a, b, c);

@Component({
    selector: 'app-thankyou',
    templateUrl: './thankyou.component.html',
    styleUrls: ['./thankyou.component.less']
})
export class ThankyouComponent implements OnInit {

    constructor(
        _seoService: SeoService,
        _langService: LangService,
        _orderService: OrderService) {
        if (_orderService.recentOrder == null) {
            _langService.navigateTo("");
        }
        let recentOrder = _orderService.recentOrder;
        _orderService.recentOrder = null;

        _seoService.preventIndex();
        _seoService.updateOgImage();
        _seoService.updateTitle("");
        _seoService.updateOgUrl('thank-you');

        // send facebook pixel
        fbq('track', 'Purchase', {
            value: recentOrder.price,
            currency: 'UAH',
        });
    }

    ngOnInit() {
    }

}
