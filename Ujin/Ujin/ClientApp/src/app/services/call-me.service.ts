import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service';

@Injectable()
export class CallMeService {

  private static phoneLength: number = 9;

  private _user: CallMeUser = new CallMeUser();
  private _validationRes: ValidationResult;

  constructor(private dataLoaderService: DataLoaderService) { }

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
    this._validationRes.isPhoneValid = false;
    var phone = this._user.phone ? this._user.phone.replace(/ /g, "") : this._user.phone;
    if (phone.length != CallMeService.phoneLength) return;
    var numbReg = /^\d+$/;
    if (!numbReg.test(phone)) return;
    this._validationRes.isPhoneValid = true;
  }

  public postCallMeData() {
    this._user.phone = this._user.phone.replace(/ /g, "");
    this.dataLoaderService.postData("api/CallMe/PostCallMeData", this._user)
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
