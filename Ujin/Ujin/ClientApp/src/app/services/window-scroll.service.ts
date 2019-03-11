import { Injectable } from '@angular/core';

@Injectable()
export class WindowScrollService {

  private _scrollLock: boolean = false;
  private _currentScrollTop: number;

  constructor() {
    window.addEventListener('scroll', () => this.onScroll());
  }

  private onScroll() {
    if (this._scrollLock) {
      window.scroll(window.scrollX, this._currentScrollTop);
    }
  }

  public disableScroll() {
    this._scrollLock = true;
    this._currentScrollTop = window.scrollY;

  }

  public enableScroll() {
    this._scrollLock = false;
  }
}
