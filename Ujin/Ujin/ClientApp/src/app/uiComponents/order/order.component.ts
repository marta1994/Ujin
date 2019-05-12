import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { OnAction } from '../popup/OnAction';
import { OrderService, OrderUser, Property } from '../../services/order.service';
import { OrderGaService } from '../../googleAnalytics/order-ga.service';
import { DeviceTypeService, DeviceType } from '../../services/device-type.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [
    OrderService
  ]
})
export class OrderComponent implements OnInit, OnAction, AfterViewInit, OnDestroy {
  
  public show2Views: boolean = true;

  @Output()
  public actionHappened: EventEmitter<void> = new EventEmitter<void>();

  private _showLeft: boolean = true;

  constructor(
    private orderService: OrderService,
    private gaService: OrderGaService,
    private deviceTypeService: DeviceTypeService) {
    this.show2Views = this.deviceTypeService.deviceType === DeviceType.Desktop;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public get showLeft(): boolean {
    if (this.show2Views) return true;
    return this._showLeft;
  }

  public get showRight(): boolean {
    if (this.show2Views) return true;
    return !this._showLeft;
  }

  public switchShow() {
    this._showLeft = !this._showLeft;
  }

  public get properties(): Property[] {
    return this.orderService.properties;
  }

  public get user(): OrderUser {
    return this.orderService.user;
  }

  public get isNameValid(): boolean {
    if (!this.orderService.validationResult) return true;
    return this.orderService.validationResult.isNameValid;
  }

  public get isPhoneValid(): boolean {
    if (!this.orderService.validationResult) return true;
    return this.orderService.validationResult.isPhoneValid;
  }

  public get isEmailValid(): boolean {
    if (!this.orderService.validationResult) return true;
    return this.orderService.validationResult.isEmailValid;
  }

  public onSubmit() {
    if (!this.orderService.validate()) return;
    this.orderService.makeAnOrder();
    this.actionHappened.emit();
  }

}


