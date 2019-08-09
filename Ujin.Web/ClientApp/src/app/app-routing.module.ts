import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LangComponent } from './core/lang/lang.component';
import { ModelPageComponent } from './model/model-page/model-page.component';
import { OrderComponent } from './order/order/order.component';
import { ThankyouComponent } from './order/thankyou/thankyou.component';
import { WrongPathComponent } from './core/wrong-path/wrong-path.component';


const routes: Routes = [
  {
    path: ':lang',
    component: LangComponent,
    children: [
      {
        path: 'model/:id',
        component: ModelPageComponent
      },
      {
        path: 'place-order',
        component: OrderComponent
      },
      {
        path: 'thank-you',
        component: ThankyouComponent
      },
      {
        path: 'wrong-path',
        component: WrongPathComponent
      },
      {
        path: '**',
        redirectTo: 'model/ov-rn'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'ua/model/ov-rn'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
