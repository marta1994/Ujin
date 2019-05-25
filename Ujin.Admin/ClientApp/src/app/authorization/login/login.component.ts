import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public user: AuthUser = new AuthUser("", "");

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  public signin() {
    this._authService.authenticate(this.user);
  }
}
