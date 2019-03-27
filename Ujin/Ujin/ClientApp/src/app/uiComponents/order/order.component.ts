import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OnAction } from '../popup/OnAction';
import { OrderService, OrderUser } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit, OnAction {

  @Output()
  public actionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
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
