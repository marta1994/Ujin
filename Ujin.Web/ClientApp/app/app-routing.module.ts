import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModelWidgetComponent } from './model/model-widget/model-widget.component';
import { LangComponent } from './core/lang/lang.component';

const routes: Routes = [
    {
        path: ':lang',
        component: LangComponent,
        children: [
            {
                path: 'model/:id',
                component: ModelWidgetComponent
            }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(
            routes,
            {
                useHash: false,
                preloadingStrategy: PreloadAllModules,
                initialNavigation: 'enabled'
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}