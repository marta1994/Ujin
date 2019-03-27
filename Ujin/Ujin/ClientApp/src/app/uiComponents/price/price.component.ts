import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { PopupService } from '../popup/popup.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less']
})
export class PriceComponent implements OnInit {

  constructor(
    private priceService: PriceService,
    private popupService: PopupService) {
  }

  ngOnInit() {
  }

  public get price(): number {
    return this.priceService.price;
  }

  public openOrderDialog() {
    this.popupService.open(OrderComponent, { showCloseButton: true, width: "100%", height: "400px" });
  }

}
