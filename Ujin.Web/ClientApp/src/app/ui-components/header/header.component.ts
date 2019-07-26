import { Component, AfterViewInit, HostBinding, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';
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
export class HeaderComponent implements AfterViewInit {

  private _headerVisibility: VisibilityState = VisibilityState.Visible;

  public menuOpened: boolean = false;

  public likeOpened: boolean = false;

  constructor() { }

  ngAfterViewInit() {
    const scroll = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp = scroll.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown = scroll.pipe(
      filter(direction => direction === Direction.Down)
    );

    scrollUp.subscribe(() => this._headerVisibility = VisibilityState.Visible);
    scrollDown.subscribe(() => this._headerVisibility = VisibilityState.Hidden);
  }

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
