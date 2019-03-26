import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-mobile-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less']
})
export class PriceComponent implements OnInit {

  constructor(private priceService: PriceService) {
  }

  ngOnInit() {
  }

  public get price(): number {
    return this.priceService.price;
  }

}
