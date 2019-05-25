import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate(): boolean {
    if (!this._auth.isAuthenticated()) {
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }
}
