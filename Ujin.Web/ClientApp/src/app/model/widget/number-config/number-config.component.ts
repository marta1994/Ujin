import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NumberConfiguration } from '../../models';

@Component({
    selector: 'app-number-config',
    templateUrl: './number-config.component.html',
    styleUrls: ['./number-config.component.less']
})
export class NumberConfigComponent implements OnInit {

    @Input()
    public configuration: NumberConfiguration;

    @Output()
    public onChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    public valueChanged() {
        this.onChange.emit(this.configuration.identifier);
    }
}
