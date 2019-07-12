import { Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { JewelryModel, Configuration, JewelryModelConfigType } from '../models';
import { trigger, transition, useAnimation, state, style, animate } from '@angular/animations';
import { fadeOut, fadeIn } from 'ng-animate';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.less'],
    animations: [
        trigger('widgetImg', [
            transition('* => out',
                useAnimation(fadeOut, { params: { timing: 0.1 } })),
            transition('* => in',
                useAnimation(fadeIn, { params: { timing: 0.3 } })),
            state('loading', style({
                opacity: 0
            })),
            transition('* => loading', [animate(0.3)])])
    ]
})
export class WidgetComponent implements OnInit, OnChanges {

    @Input()
    public model: JewelryModel;

    @Output()
    public onChange: EventEmitter<string> = new EventEmitter<string>();

    public selectedConfig: Configuration;

    public imageIndexes: number[];

    public JewelryModelConfigType = JewelryModelConfigType;

    constructor(private _changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.model || !this.model) return;
        this.imageIndexes = [];
        for (let i = 0; i < this.model.imagesCount; ++i)
            this.imageIndexes.push(i);
        this.selectedConfig = this.model.configurations[0];
    }

    public getImgSrc(index: number): string {
        return `api/JewelryModel/WidgetImage/?sku=${this.model.sku}&index=${index}`;
    }

    public selectConfig(config: Configuration) {
        this.selectedConfig = config;
    }

    public isSelected(config: Configuration): boolean {
        return this.selectedConfig === config;
    }

    public modelChanged(configId: string) {
        this.currentConfigId = configId;
        this.imgAnimate = ImgAnimateState.Out;
        this.loadedIndexes = [];
    }
    
    private currentConfigId: string;
    public imgAnimate: ImgAnimateState;
    private loadedIndexes: number[] = [];

    public imgAnimateDone(event) {
        switch (event.toState) {
            case ImgAnimateState.Out:
                if (this.currentConfigId != null) {
                    this.onChange.emit(this.currentConfigId);
                    this.currentConfigId = null;
                }
                this.imgAnimate = ImgAnimateState.Loading;
                this.tryStartInAnimation();
                break;
            case ImgAnimateState.In:
                this.imgAnimate = ImgAnimateState.None;
                this._changeDetector.detectChanges();
                break;
        }
    }

    public onImageLoded(index: number) {
        this.loadedIndexes.push(index);
        if (this.imgAnimate != ImgAnimateState.Loading) return;
        this.tryStartInAnimation();
    }

    private tryStartInAnimation() {
        let loaded = this.imageIndexes.find(i => this.loadedIndexes.find(li => li == i) == null) == null;
        let complete = this.imageIndexes.map(i => this.getImgSrc(i)).reduce((pr, curr) => {
            let img = new Image();
            img.src = curr;
            return img.complete && pr;
        });
        
        if (!complete && !loaded) return;
        this.imgAnimate = ImgAnimateState.In;
    }
}

enum ImgAnimateState {
    In = "in",
    Out = "out",
    Loading = "loading",
    None = "none"
}
