import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { RingInfoService, RingInfo } from '../../services/ring-info.service';
import { PopupService } from '../popup/popup.service';
import { OrderComponent } from '../order/order.component';
import { RingInfoGaService } from '../../googleAnalytics/ring-info-ga.service';

@Component({
  selector: 'app-ring-info',
  templateUrl: './ring-info.component.html',
  styleUrls: ['./ring-info.component.less']
})
export class RingInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public popupWidth: string = "100%";

  constructor(
    private ringInfoService: RingInfoService,
    private popupService: PopupService,
    private gaService: RingInfoGaService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public get ringInfo(): RingInfo {
    return this.ringInfoService.ringInfo;
  }

  public openOrderDialog() {
    this.popupService.open(OrderComponent, { showCloseButton: true, width: this.popupWidth });
  }

}
