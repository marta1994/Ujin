import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent implements OnInit {

  private _menuState: MenuState = MenuState.Closed;

  constructor() { }

  ngOnInit() {
  }

  public get menuOpened(): boolean {
    return this._menuState === MenuState.Opened;
  }

  public get menuClosed(): boolean {
    return this._menuState === MenuState.Closed;
  }

  public shwitchMenuState() {
    this._menuState = this._menuState === MenuState.Closed ? MenuState.Opened : MenuState.Closed;
  }

}

enum MenuState {
  Opened = "opened";
  Closed = "closed";
}
