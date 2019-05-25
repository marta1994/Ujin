import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ApiModule } from '../api/api.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwtModule,
    ApiModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuardService,
    AuthService
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthorizationModule { }
