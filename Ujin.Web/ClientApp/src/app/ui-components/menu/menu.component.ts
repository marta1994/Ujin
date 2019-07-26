import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Output()
  public menuCloseActionHappened: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
  }

  public actionHappened() {
    this.menuCloseActionHappened.emit();
  }

  public goToContacts() {
    let el = document.getElementById("contacts");
    el.scrollIntoView();
    this.actionHappened();
  }
}
