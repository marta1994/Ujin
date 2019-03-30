import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';
import { PhoneValidatorService } from './phone-validator.service';

@Injectable()
export class CallMeService {
  private _user: CallMeUser = new CallMeUser();
  private _validationRes: ValidationResult;

  constructor(
    private dataLoaderService: DataLoaderService,
    private phoneValidator: PhoneValidatorService) { }

  public get user(): CallMeUser {
    return this._user;
  }

  public get validationResult(): ValidationResult {
    if (!this._validationRes) return null;
    this.validateName();
    this.validatePhone();
    return this._validationRes;
  }

  public validate(): boolean {
    this._validationRes = new ValidationResult();
    this.validateName();
    this.validatePhone();
    return this._validationRes.isPhoneValid && this._validationRes.isNameValid;
  }

  private validateName() {
    var name = this._user.name ? this._user.name.replace(/ /g, "") : this._user.name;
    this._validationRes.isNameValid = !!name;
  }

  private validatePhone() {
    this._validationRes.isPhoneValid = this.phoneValidator.isValidPhone(this._user.phone);
  }

  public postCallMeData() {
    var user = {
      phone: this.phoneValidator.normalizePhone(this._user.phone),
      name: this._user.name
    };
    this.dataLoaderService.postData("api/User/PostCallMeData", user)
      .subscribe(() => { }, error => console.log(error));
  }
}

export class CallMeUser {
  public name: string;
  public phone: string;
}

export class ValidationResult {
  public isNameValid: boolean;
  public isPhoneValid: boolean;
}
