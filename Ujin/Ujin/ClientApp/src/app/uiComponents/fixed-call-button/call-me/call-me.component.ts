import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OnAction } from '../../../uiComponents/popup/OnAction';
import { CallMeService, CallMeUser } from '../../../services/call-me.service';

@Component({
  selector: 'app-call-me',
  templateUrl: './call-me.component.html',
  styleUrls: ['./call-me.component.less'],
  providers: [
    CallMeService
  ]
})
export class CallMeComponent implements OnInit, OnAction {

  @Output()
  public actionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(private callMeService: CallMeService) { }

  ngOnInit() {
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
