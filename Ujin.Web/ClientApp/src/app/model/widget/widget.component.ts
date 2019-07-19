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
                useAnimation(fadeIn, { params: { timing: 0.2 } })),
            state('loading', style({
                opacity: 0
            }))])
    ]
})
export class WidgetComponent implements OnInit, OnChanges {

    @Input()
    public model: JewelryModel;

    @Input()
    public currentImages: string[] = [];

    @Output()
    public onChange: EventEmitter<string> = new EventEmitter<string>();

    public selectedConfig: Configuration;

    public JewelryModelConfigType = JewelryModelConfigType;

    public imageIndexes: number[];

    constructor(private _changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentImages) {
            var oldImages = changes.currentImages.previousValue;
            var currImages = changes.currentImages.currentValue;
            if (!this.areStrArraysEqual(oldImages, currImages))
                this.triggerAnimation();
        }
        if (changes.model && this.model) {
            this.selectedConfig = this.model.configurations[0];
            this.imageIndexes = [];
            for (let i = 0; i < this.model.imagesCount; ++i)
                this.imageIndexes.push(i);
        }
    }

    public selectConfig(config: Configuration) {
        this.selectedConfig = config;
    }

    public isSelected(config: Configuration): boolean {
        return this.selectedConfig === config;
    }

    public modelChanged(configId: string) {
        this.currentConfigId = configId;
        this.onChange.emit(this.currentConfigId);
    }

    private areStrArraysEqual(ar1: string[], ar2: string[]) {
        if (ar1 == null && ar2 == null) return true;
        if (ar1 == null || ar2 == null) return false;
        if (ar1.length != ar2.length) return false;
        return ar1.find(el1 => ar2.find(el2 => el2 === el1) == null) == null;
    }

    private triggerAnimation() {
        this.imgAnimate = ImgAnimateState.Out;
        this.loadedIndexes = [];
        this.currentImages.forEach((img, ind) => {
            let image = new Image();
            image.onload = () => this.onImageLoded(ind);
            image.src = img;
        });
    }
    
    private currentConfigId: string;
    public imgAnimate: ImgAnimateState;
    private loadedIndexes: number[] = [];

    public imgAnimateDone(event) {
        switch (event.toState) {
            case ImgAnimateState.Out:
                if (this.currentConfigId != null) {
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
        if (this.loadedIndexes.indexOf(index) < 0)
            this.loadedIndexes.push(index);
        if (this.imgAnimate != ImgAnimateState.Loading) return;
        this.tryStartInAnimation();
    }

    private tryStartInAnimation() {
        let loaded = this.loadedIndexes.length === this.currentImages.length;
        if (!loaded) return;
        this.imgAnimate = ImgAnimateState.In;
    }
}

enum ImgAnimateState {
    In = "in",
    Out = "out",
    Loading = "loading",
    None = "none"
}
