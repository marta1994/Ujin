import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _api: ApiService,
    private _router: Router) { }

  public isAuthenticated(): boolean {
    return !!this.currentUser.token;
  }

  public get currentUser(): IUser {
    return JSON.parse(localStorage.getItem('currentUser') || "{}") as IUser;
  }

  public authenticate(authUser: AuthUser) {
    return this._api.postData<AuthUser, IUser>("api/user/authenticate", authUser)
      .then(u => {
        localStorage.setItem('currentUser', JSON.stringify(u));
        this._router.navigateByUrl('/content/home');
      },
      error => {
        var message = (error && error.error && error.error.message) ? error.error.message :
          (error && error.message ? error.message : error);
        alert(message);
      });
  }

  public logout() {
    localStorage.setItem('currentUser', JSON.stringify({}));
  }
}

export interface IUser {
  email: string;
  phone: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

export class AuthUser {

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public username: string;
  public password: string;
}
