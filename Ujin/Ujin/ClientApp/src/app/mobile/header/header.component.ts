import {
  Component, OnInit, HostListener, OnDestroy, AfterViewInit,
  trigger, state, style, transition, animate, HostBinding
} from '@angular/core';
import { HeaderGaService } from '../../googleAnalytics/header-ga.service';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-mobile-header',
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
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private _menuState: MenuState = MenuState.Closed;

  private _headerVisibility: VisibilityState = VisibilityState.Visible;

  public buttonsVisible: boolean = false;

  public discountHref: string;

  constructor(
    private socialService: SocialService,
    private gaService: HeaderGaService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe((res) => {
      this.discountHref = res.discountHref;
    });
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }

  @HostBinding('@toggle')
  public get headerVisibility(): VisibilityState {
    return this._headerVisibility;
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

  private _currScrollPosition: number;

  @HostListener('window:scroll')
  public scroll() {
    if (this._currScrollPosition == null) this._currScrollPosition = window.pageYOffset;
    if (Math.abs(this._currScrollPosition - window.pageYOffset) < 50) return;
    if (this._currScrollPosition > window.pageYOffset) {
      this._headerVisibility = VisibilityState.Visible;
      console.log("header visible");
    }
    if (this._currScrollPosition < window.pageYOffset) {
      this._headerVisibility = VisibilityState.Hidden;
      this.clickout();
      console.log("header hidden");
    }
    this._currScrollPosition = window.pageYOffset;
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

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}
