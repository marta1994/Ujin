import {
  Component, OnInit, OnDestroy, AfterViewInit,
  trigger, state, style, transition, animate, HostBinding
} from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { languages } from '../../configs/localization.config';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime, map, distinctUntilChanged, pairwise, share, filter } from 'rxjs/operators';
import { HeaderGaService } from '../../googleAnalytics/header-ga.service';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-desktop-header',
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

  private _headerVisibility: VisibilityState = VisibilityState.Visible;

  public languages: { name: string, code: string }[];

  public discountHref: string;

  constructor(
    private _locale: LocaleService,
    private socialService: SocialService,
    private gaService: HeaderGaService) {
    this.languages = languages.length <= 1 ? [] : languages.map(l => {
      return {
        name: l.displayName,
        code: l.code
      };
    });
  }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe((res) => {
      this.discountHref = res.discountHref;
    });
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();

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

  ngOnDestroy() {
    this.gaService.dispose();
  }

  @HostBinding('@toggle')
  public get headerVisibility(): VisibilityState {
    return this._headerVisibility;
  }

  public isLangSelected(lang: { name: string, code: string }): boolean {
    return this._locale.getCurrentLanguage() === lang.code;
  }

  public setLanguage(lang: { name: string, code: string }) {
    if (this.isLangSelected(lang)) {
      return;
    }
    this._locale.setCurrentLanguage(lang.code);
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
