import { Component, OnInit, Input } from '@angular/core';
import { ModelInfoNode, ModelInfo } from 'src/app/model/models';

@Component({
    selector: 'app-model-info',
    templateUrl: './model-info.component.html',
    styleUrls: ['./model-info.component.less']
})
export class ModelInfoComponent implements OnInit {

    @Input()
    public modelInfo: ModelInfo;

    @Input()
    public showPrice: boolean = true;

    constructor() { }

    ngOnInit() {
    }
}

@Component({
    selector: 'app-info-node',
    template: `<div class="node-wrapper property-value">
        <label class="property">{{node.nameKey|translate}}:</label>
        <label *ngIf="!node.children || node.children.length == 0" class="value">
            {{node.needTranslateValue ? (node.value|translate) : node.value}}{{' '}}{{node.suffixKey|translate}}
        </label>
        <div class="children-wrapper" *ngIf="node.children && node.children.length > 0">
            <app-info-node *ngFor="let child of node.children" [node]="child"></app-info-node>
        </div>
    </div>`
})
export class InfoNodeComponent {

    @Input()
    public node: ModelInfoNode;
}
