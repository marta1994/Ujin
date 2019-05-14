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
    if (this.isValid0Start(phone)) return true;
    if (this.isValid9Digits(phone)) return true;
    if (this.isValidPlusStart(phone)) return true;
    return false;
  }

  private isValid0Start(phone: string): boolean {
    if (phone.length != PhoneValidatorService.phoneLength + 1) return false;
    if (phone[0] != '0') return false;
    if (!PhoneValidatorService.numberRegex.test(phone)) return false;
    return true;
  }

  private isValid9Digits(phone: string): boolean {
    if (phone.length != PhoneValidatorService.phoneLength) return false;
    if (!PhoneValidatorService.numberRegex.test(phone)) return false;
    return true;
  }

  private isValidPlusStart(phone: string): boolean {
    if (phone.length != PhoneValidatorService.phoneLength + 4) return false;
    if (phone.indexOf(PhoneValidatorService.phonePrefix) != 0) return false;
    if (!PhoneValidatorService.numberRegex.test(phone.substr(1))) return false;
    return true;
  }

  public normalizePhone(phone: string): string {
    if (!this.isValidPhone(phone)) return null;
    phone = phone.replace(/ /g, "");
    if (this.isValidPlusStart(phone)) return phone;
    if (this.isValid9Digits(phone)) return PhoneValidatorService.phonePrefix + phone;
    if (this.isValid0Start(phone)) return PhoneValidatorService.phonePrefix + phone.substr(1);
    return null;
  }

}
