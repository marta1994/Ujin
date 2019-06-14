import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';
import { PhoneValidatorService } from './phone-validator.service';
import { EmailValidatorService } from './email-validator.service';
import { WidgetService, MenuConfig, GemstoneOption } from './widget.service';
import { RingInfoService } from './ring-info.service';
import { TranslationService } from 'angular-l10n';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

  private _user: OrderUser = new OrderUser();
  private _validationRes: ValidationResult;
  private _properties: Property[];

  constructor
    (private dataLoader: DataLoaderService,
    private phoneValidator: PhoneValidatorService,
    private emailValidator: EmailValidatorService,
    private widgetService: WidgetService,
    private ringInfoService: RingInfoService,
    private translation: TranslationService) {
  }

  public get user(): OrderUser {
    return this._user;
  }

  public get properties(): Property[] {
    if (this._properties != null) return this._properties;

    var tr = v => this.translation.translate(v);

    this._properties = [];
    this._properties.push({ name: tr(WidgetService.METAL_KEY), value: tr(this.widgetService.metalSelectedItem.nameKey) });
    this._properties.push({ name: tr(WidgetService.GEMSTONE_KEY), value: tr(this.widgetService.gemstoneSelectedItem.nameKey) });
    this._properties.push({
      name: tr("ringInfo.gemstoneSizeLabel"),
      value: this.ringInfoService.ringInfo.gemstoneLengthMm + " x " + this.ringInfoService.ringInfo.gemstoneWidthMm + " " + tr("ringInfo.measure.milimeters")
    });
    var opKey = GemstoneOption[this.widgetService.gemstoneOptionItem.value].toLocaleLowerCase();
    this._properties.push({ name: tr(WidgetService.GEMSTONE_OPTION_KEY), value: tr("widget.gemstone." + opKey) });
    if (this.ringInfoService.ringInfo.gemstoneWeight != null) {
      this._properties.push({ name: tr("ringInfo.gemstoneWeightLabel"), value: this.ringInfoService.ringInfo.gemstoneWeight + " " + tr("ringInfo.measure.carats") });
    }
    this._properties.push({ name: tr(WidgetService.DECORATION_KEY), value: tr(this.widgetService.decorationSelectedItem.nameKey) });
    this._properties.push({ name: tr(WidgetService.SIZE_CONFIG.nameKey), value: this.widgetService.selectedSize + "" });
    this._properties.push({ name: tr("ringInfo.metalWeightLabel"), value: this.ringInfoService.ringInfo.metalWeight + " " + tr("ringInfo.measure.grams") });
    this._properties.push({ name: tr("ringInfo.priceLabel"), value: this.ringInfoService.ringInfo.price + " " + tr("ringInfo.currency.uah"), class: "price-val" });

    return this._properties;
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
    return this._validationRes.isPhoneValid && this._validationRes.isNameValid && this._validationRes.isEmailValid;
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

  public makeAnOrder(): Observable<{}> {
    var user = {
      name: this._user.name,
      phone: this.phoneValidator.normalizePhone(this._user.phone),
      email: this.emailValidator.normalizeEmail(this._user.email),
      order: new Order(this.ringInfoService.price, this.widgetService.configuration)
    };

    user.order.definition += `\r\n Showed to user: ${JSON.stringify(this.properties)}`

    return this.dataLoader.postData("api/User/PostOrderData", user);
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

export interface Property {
  name: string;
  value: string;
  class?: string;
}
