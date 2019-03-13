import { Component, OnInit } from '@angular/core';
import { MenuState } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

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

  public onMenuStateChange(menuState: MenuState) {
    this._menuState = menuState;
  }

}
