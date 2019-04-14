import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';
import { PhoneValidatorService } from './phone-validator.service';
import { EmailValidatorService } from './email-validator.service';
import { WidgetService, MenuConfig } from './widget.service';
import { RingInfoService } from './ring-info.service';

@Injectable()
export class OrderService {

  private _user: OrderUser = new OrderUser();
  private _validationRes: ValidationResult;

  constructor
    (private dataLoader: DataLoaderService,
    private phoneValidator: PhoneValidatorService,
    private emailValidator: EmailValidatorService,
    private widgetService: WidgetService,
    private ringInfoService: RingInfoService) {
  }

  public get user(): OrderUser {
    return this._user;
  }

  public get validationResult(): ValidationResult {
    if (!this._validationRes) return null;
    this.validateName();
    this.validatePhone();
    this.validateEmail();
    return this._validationRes;
  }

  public validate(): boolean {
    this._validationRes = new ValidationResult();
    this.validateName();
    this.validatePhone();
    this.validateEmail();
    return this._validationRes.isPhoneValid && this._validationRes.isNameValid;
  }

  private validateName() {
    var name = this._user.name ? this._user.name.replace(/ /g, "") : this._user.name;
    this._validationRes.isNameValid = !!name;
  }

  private validatePhone() {
    this._validationRes.isPhoneValid = this.phoneValidator.isValidPhone(this._user.phone);
  }

  private validateEmail() {
    this._validationRes.isEmailValid = this.emailValidator.isValidEmail(this._user.email);
  }

  public makeAnOrder() {
    var user = {
      name: this._user.name,
      phone: this.phoneValidator.normalizePhone(this._user.phone),
      email: this.emailValidator.normalizeEmail(this._user.email),
      order: new Order(this.ringInfoService.price, this.widgetService.configuration)
    };

    this.dataLoader.postData("api/User/PostOrderData", user)
      .subscribe(() => { }, error => console.log(error));
  }

}

export class OrderUser {
  public name: string;
  public phone: string;
  public email: string;
  public order: Order;
}

class Order {
  constructor(
    price: number,
    config: MenuConfig[]) {
    let res: any = {};
    for (let cfg of config) {
      res[this.namePart(cfg.nameKey, 1)] =
        cfg.value.nameKey ? this.namePart(cfg.value.nameKey, 2) : cfg.value;
    }
    res.price = price;

    this.definition = JSON.stringify(res);
  }

  private namePart(name: string, ind: number): string {
    var splitted = name.split(".");
    return splitted[ind];
  }

  public definition: string;
}

export class ValidationResult {
  public isNameValid: boolean;
  public isPhoneValid: boolean;
  public isEmailValid: boolean;
}
