import { Injectable } from '@angular/core';

@Injectable()
export class SliderHelperService {

  public px(val: number): string {
    return val + "px";
  }

  public setBorderRadius(styleObj: Object, val: number) {
    styleObj['border-radius'] = this.px(val);
    styleObj['-webkit-border-radius'] = this.px(val);
    styleObj['-moz-border-radius'] = this.px(val);
    styleObj['-o-border-radius'] = this.px(val);
  }

}
