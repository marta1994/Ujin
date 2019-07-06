import { Component, OnInit } from '@angular/core';
import { LangService } from './lang.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-lang',
    templateUrl: './lang.component.html',
    styleUrls: ['./lang.component.less']
})
export class LangComponent implements OnInit {

    private readonly langParam: string = "lang";

    public languages: string[];

    constructor(
        private _langService: LangService,
        private _activatedRoute: ActivatedRoute) {
        this.languages = this._langService.languages;
    }

    ngOnInit() {
        this._langService.setLangFromRoute(this._activatedRoute.snapshot.paramMap.get(this.langParam));
        this._activatedRoute.params.subscribe(params => {
            this._langService.setLangFromRoute(params[this.langParam]);
        })
    }

    public setLang(lang: string) {
        this._langService.reRouteToLang(lang);
    }
}
