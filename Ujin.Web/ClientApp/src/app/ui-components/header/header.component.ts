import { Component, HostBinding, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, HeaderEvents } from 'src/app/google-analytics/events';

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
export class HeaderComponent {

    private _headerVisibility: VisibilityState = VisibilityState.Visible;

    public menuOpened: boolean = false;

    constructor(
        private _translateService: TranslateService,
        private _gaService: GaService) { }

    public get catalogLink(): string {
        return `/${this._translateService.currentLang}/catalog`;
    }

    public get cartLink(): string {
        return `/${this._translateService.currentLang}/place-order`;
    }

    public catalogClick() {
        this._gaService.sendEvent(EventCategory.Header, HeaderEvents.CatalogClick);
    }

    public cartClick() {
        this._gaService.sendEvent(EventCategory.Header, HeaderEvents.CartClick);
    }

    @HostBinding('@toggle')
    public get headerVisibility(): VisibilityState {
        return this._headerVisibility;
    }

    public switchMenu() {
        this.menuOpened = !this.menuOpened;
    }

    public goToContacts() {
        this._gaService.sendEvent(EventCategory.Header, HeaderEvents.ContactsClick);
        let el = document.getElementById("contacts");
        el.scrollIntoView();
    }

    private _currScrollPosition: number;

    @HostListener('window:scroll')
    public scroll() {
        if (this._currScrollPosition == null) this._currScrollPosition = window.pageYOffset;
        if (Math.abs(this._currScrollPosition - window.pageYOffset) < 50) return;
        if (window.pageYOffset < 50) {
            this._headerVisibility = VisibilityState.Visible;
        }
        else if (this._currScrollPosition > window.pageYOffset) {
            this._headerVisibility = VisibilityState.Visible;
        }
        else if (this._currScrollPosition < window.pageYOffset) {
            this._headerVisibility = VisibilityState.Hidden;
            this.clickout();
        }
        this._currScrollPosition = window.pageYOffset;
    }

    @HostListener('document:scroll')
    @HostListener('document:click')
    public clickout() {
        this.menuOpened = false;
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
