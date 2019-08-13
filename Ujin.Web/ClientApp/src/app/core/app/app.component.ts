import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  private routerSub$: Subscription;
  private prevUrl: string = "";

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.routerSub$ = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.eligibleToScrollTop(evt.url))
        window.scrollTo(0, 0);
      this.prevUrl = evt.url;
    });
  }

  private eligibleToScrollTop(url: string): boolean {
    if (!this.prevUrl) return true;
    return url.split('?')[0] !== this.prevUrl.split('?')[0];
  }

  ngOnDestroy() {
    this.routerSub$.unsubscribe();
  }
}
