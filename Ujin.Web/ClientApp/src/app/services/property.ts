export interface IProperty {
  name: string;
  value: any;
  isValid: boolean;
}

export abstract class Property<T> implements IProperty {

  constructor(name: string, labelKey: string) {
    this.name = name;
    this.labelKey = labelKey;
  }

  public labelKey: string;
  public name: string;
  public value: T;
  public abstract isValid: boolean;
}

export class StringProperty extends Property<string> {

  constructor(name: string, labelKey: string, regEx?: RegExp, minLength?: number, maxLength?: number) {
    super(name, labelKey);
    this.regEx = regEx;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  public regEx?: RegExp;
  public minLength?: number;
  public maxLength?: number;
  public inputType: string = "text";

  public get isValid() {
    if (this.minLength != null && (!this.value || this.value.length < this.minLength))
      return false;
    if (this.maxLength != null && this.value && this.value.length > this.maxLength)
      return false;
    if (this.regEx != null && !this.regEx.test(this.value))
      return false;
    return true;
  }
}
