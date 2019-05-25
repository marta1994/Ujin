import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ContentComponent } from './content/content.component';
import { AuthGuardService } from './authorization/auth-guard.service';
import { LoginComponent } from './authorization/login/login.component';
import { AuthorizationModule } from './authorization/authorization.module';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: '', component: HomeComponent },
          { path: 'fetch-data', component: FetchDataComponent }
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ]),
    ApiModule,
    AuthorizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
