import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private _menuState: MenuState = MenuState.Closed;

  public buttonsVisible: boolean = false;

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
    this.buttonsVisible = false;
    this._menuState = this._menuState === MenuState.Closed ? MenuState.Opened : MenuState.Closed;
  }

  public switchButtonsState() {
    this._menuState = MenuState.Closed;
    this.buttonsVisible = !this.buttonsVisible;
  }

  @HostListener('document:click')
  public clickout() {
    this._menuState = MenuState.Closed;
    this.buttonsVisible = false;
  }

  public openedItemClick(event: MouseEvent) {
    event.stopPropagation();
  }
}

enum MenuState {
  Opened = "opened",
  Closed = "closed"
}
