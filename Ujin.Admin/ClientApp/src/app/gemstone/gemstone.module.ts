import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GemSourceComponent } from './gem-source/gem-source.component';
import { GemstoneComponent } from './gemstone.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export class GemstoneRouteProvider {
  public static getRoute(): Route {
    return {
      path: 'gemstone',
      component: GemstoneComponent,
      children: [
        {
          path: 'gem-source',
          component: GemSourceComponent
        },
        { path: '**', redirectTo: 'gem-source' }
      ]
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    GemSourceComponent,
    GemstoneComponent
  ]
})
export class GemstoneModule { }
