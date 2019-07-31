import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { OrderService } from 'src/app/services/order.service';
import { LangService } from 'src/app/core/lang/lang.service';

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
    if (!_orderService.justMadeOrder) {
      _langService.navigateTo("");
    }
    _orderService.justMadeOrder = false;

    _seoService.preventIndex();
    _seoService.updateOgImage();
    _seoService.updateTitle("");
    _seoService.updateOgUrl('thank-you')
  }

  ngOnInit() {
  }

}
