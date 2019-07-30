import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LangComponent } from './core/lang/lang.component';
import { ModelPageComponent } from './model/model-page/model-page.component';
import { OrderComponent } from './order/order/order.component';


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
        path: 'wrong-path',
        component: OrderComponent
      },
      {
        path: '**',
        redirectTo: 'model'
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
