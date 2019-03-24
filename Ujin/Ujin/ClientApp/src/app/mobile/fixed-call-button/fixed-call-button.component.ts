import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from '../../uiComponents/popup/popup.service';
import { CallMeComponent } from './call-me/call-me.component';

@Component({
  selector: 'app-fixed-call-button',
  templateUrl: './fixed-call-button.component.html',
  styleUrls: ['./fixed-call-button.component.less']
})
export class FixedCallButtonComponent implements OnInit {

  @Input()
  public size: string = "40px";

  constructor(private popupService: PopupService) { }

  ngOnInit() {
  }

  public get buttonStyle(): object {
    return {
      "width": this.size,
      "height": this.size,
      "border-radius": `calc(${this.size}/2)`
    };
  }

  public openCallMeDialog() {
    this.popupService.open(CallMeComponent, { showCloseButton: true, width: "100%", height: "340px" });
  }
}
