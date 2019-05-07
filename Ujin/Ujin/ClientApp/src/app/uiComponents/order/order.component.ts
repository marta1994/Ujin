import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { OnAction } from '../popup/OnAction';
import { OrderService, OrderUser, Property } from '../../services/order.service';
import { OrderGaService } from '../../googleAnalytics/order-ga.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [
    OrderService
  ]
})
export class OrderComponent implements OnInit, OnAction, AfterViewInit, OnDestroy {

  @Output()
  public actionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private orderService: OrderService,
    private gaService: OrderGaService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
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


