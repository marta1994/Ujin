import { EventEmitter } from "@angular/core";

export interface OnAction {
  actionHappened: EventEmitter<void>;
}
