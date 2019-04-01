import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { PopupService } from '../popup/popup.service';
import { OrderComponent } from '../order/order.component';
import { PriceGaService } from '../../googleAnalytics/price-ga.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less']
})
export class PriceComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public popupWidth: string = "100%";

  constructor(
    private priceService: PriceService,
    private popupService: PopupService,
    private gaService: PriceGaService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public get price(): number {
    return this.priceService.price;
  }

  public openOrderDialog() {
    this.popupService.open(OrderComponent, { showCloseButton: true, width: this.popupWidth });
  }

}
