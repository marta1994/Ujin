import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { REQUEST } from '@nguniversal/aspnetcore-engine/tokens';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
    private defaultPageTitle: string = 'Ujin jewelry';

    private routerSub$: Subscription;
    private request;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private injector: Injector
    ) {
        this.request = this.injector.get(REQUEST);
    }

    ngOnInit() {
        this._changeTitleOnNavigation();
    }

    ngOnDestroy() {
        // Subscription clean-up
        this.routerSub$.unsubscribe();
    }

    private _changeTitleOnNavigation() {
        this.routerSub$ = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map(route => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(event => {
                this._setMetaAndLinks(event);
            });
    }

    private _setMetaAndLinks(event) {
        // Set Title if available, otherwise leave the default Title
        const title = event['title']
            ? event['title']
            : this.defaultPageTitle;

        this.title.setTitle(title);

        const metaData = event['meta'] || [];
        const linksData = event['links'] || [];

        for (let i = 0; i < metaData.length; i++) {
            this.meta.updateTag(metaData[i]);
        }
    }
}
