import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { PopupService } from '../../uiComponents/popup/popup.service';
import { CallMeComponent } from './call-me/call-me.component';
import { CallButtonGaService } from '../../googleAnalytics/call-button-ga.service';

@Component({
  selector: 'app-fixed-call-button',
  templateUrl: './fixed-call-button.component.html',
  styleUrls: ['./fixed-call-button.component.less']
})
export class FixedCallButtonComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public size: string = "40px";

  @Input()
  public popupWidth: string = "300px";

  constructor(
    private popupService: PopupService,
    private gaService: CallButtonGaService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  } 

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public get buttonStyle(): object {
    return {
      "width": this.size,
      "height": this.size,
      "border-radius": `calc(${this.size}/2)`
    };
  }

  public openCallMeDialog() {
    this.popupService.open(CallMeComponent, { showCloseButton: true, width: this.popupWidth });
  }

}
