import { Component, HostBinding, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  animations: [
    trigger('toggle', [
      state(
        "hidden",
        style({ transform: 'translateY(-100%)' })
      ),
      state(
        "visible",
        style({ transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent  {

  private _headerVisibility: VisibilityState = VisibilityState.Visible;

  public menuOpened: boolean = false;

  public likeOpened: boolean = false;

  constructor() { }

  @HostBinding('@toggle')
  public get headerVisibility(): VisibilityState {
    return this._headerVisibility;
  }

  public switchMenu() {
    this.menuOpened = !this.menuOpened;
    this.likeOpened = false;
  }

  public switchLike(event) {
    this.likeOpened = !this.likeOpened;
    this.menuOpened = false;
  }

  public goToContacts() {
    let el = document.getElementById("contacts");
    el.scrollIntoView();
  }

  private _currScrollPosition: number;

  @HostListener('window:scroll')
  public scroll() {
    if (this._currScrollPosition == null) this._currScrollPosition = window.pageYOffset;
    if (Math.abs(this._currScrollPosition - window.pageYOffset) < 50) return;
    if (this._currScrollPosition > window.pageYOffset) {
      this._headerVisibility = VisibilityState.Visible;
    }
    if (this._currScrollPosition < window.pageYOffset) {
      this._headerVisibility = VisibilityState.Hidden;
      this.clickout();
    }
    this._currScrollPosition = window.pageYOffset;
  }

  @HostListener('document:scroll')
  @HostListener('document:click')
  public clickout() {
    this.menuOpened = false;
    this.likeOpened = false;
  }

  public openedItemClick(event: MouseEvent) {
    event.stopPropagation();
  }
}

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}
