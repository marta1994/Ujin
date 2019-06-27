import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelWidgetComponent } from './model-widget/model-widget.component';

const routes: Routes = [
    {
        path: 'model/:id/:sku',
        component: ModelWidgetComponent
    },
    {
        path: 'model/**',
        redirectTo: 'model'
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ModelRoutingModule {

}