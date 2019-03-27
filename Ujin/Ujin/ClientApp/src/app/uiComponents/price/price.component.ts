import { Component, OnInit, Input } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { PopupService } from '../popup/popup.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less']
})
export class PriceComponent implements OnInit {

  @Input()
  public popupWidth: string = "100%";

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
    this.popupService.open(OrderComponent, { showCloseButton: true, width: this.popupWidth, height: "420px" });
  }

}
