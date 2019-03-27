import { Injectable } from '@angular/core';

@Injectable()
export class EmailValidatorService {

  private static emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor() { }

  public isValidEmail(email: string): boolean {
    if (!email) return false;
    return EmailValidatorService.emailRegex.test(email);
  }

  public normalizeEmail(email: string): string {
    if (!this.isValidEmail(email)) return null;
    return email.toLowerCase();
  }

}
