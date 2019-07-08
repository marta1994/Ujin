import { Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { JewelryModel, Configuration, JewelryModelConfigType } from '../models';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.less']
})
export class WidgetComponent implements OnInit, OnChanges {

    @Input()
    public model: JewelryModel;

    @Output()
    public onChange: EventEmitter<string> = new EventEmitter<string>();

    public selectedConfig: Configuration;

    public imageIndexes: number[];

    public JewelryModelConfigType = JewelryModelConfigType;

    constructor() { }

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
        this.onChange.emit(configId);
    }
}
