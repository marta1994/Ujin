import { Injectable } from '@angular/core';

@Injectable()
export class PhoneValidatorService {

  private static phoneLength: number = 9;
  private static phonePrefix: string = "+380";
  private static numberRegex: RegExp = /^\d+$/;

  constructor() { }

  public isValidPhone(phone: string) {
    if (!phone) return false;
    phone = phone.replace(/ /g, "");
    if (phone.length != PhoneValidatorService.phoneLength) return false;
    if (!PhoneValidatorService.numberRegex.test(phone)) return false;
    return true;
  }

  public normalizePhone(phone: string): string {
    if (!this.isValidPhone(phone)) return null;
    return PhoneValidatorService.phonePrefix + phone;
  }

}
