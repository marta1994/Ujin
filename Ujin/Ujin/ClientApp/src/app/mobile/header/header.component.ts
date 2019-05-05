import { Component, OnInit, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { HeaderGaService } from '../../googleAnalytics/header-ga.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private _menuState: MenuState = MenuState.Closed;

  public buttonsVisible: boolean = false;

  constructor(private gaService: HeaderGaService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
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
