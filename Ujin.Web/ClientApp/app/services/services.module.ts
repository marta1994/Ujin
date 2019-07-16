import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsService } from './app-settings.service';
import { ApiModule } from '../api/api.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ApiModule
    ],
    providers: [
        AppSettingsService
    ]
})
export class ServicesModule { }
