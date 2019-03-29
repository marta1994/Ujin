import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { OnAction } from '../../../uiComponents/popup/OnAction';
import { CallMeService, CallMeUser } from '../../../services/call-me.service';
import { CallMeGaService } from '../../../googleAnalytics/call-me-ga.service';

@Component({
  selector: 'app-call-me',
  templateUrl: './call-me.component.html',
  styleUrls: ['./call-me.component.less'],
  providers: [
    CallMeService
  ]
})
export class CallMeComponent implements OnInit, OnAction, AfterViewInit, OnDestroy {

  @Output()
  public actionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private callMeService: CallMeService,
    private gaService: CallMeGaService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  public get user(): CallMeUser {
    return this.callMeService.user;
  }

  public get isNameValid(): boolean {
    if (!this.callMeService.validationResult) return true;
    return this.callMeService.validationResult.isNameValid;
  }

  public get isPhoneValid(): boolean {
    if (!this.callMeService.validationResult) return true;
    return this.callMeService.validationResult.isPhoneValid;
  }

  public onSubmit() {
    if (!this.callMeService.validate()) return;
    this.callMeService.postCallMeData();
    this.actionHappened.emit();
  }

}
