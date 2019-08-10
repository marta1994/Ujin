import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NumberConfiguration } from '../../models';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, WidgetEvents } from 'src/app/google-analytics/events';

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

  constructor(private _gaService: GaService) { }

    ngOnInit() {
    }

    public valueChanged() {
      this.onChange.emit(this.configuration.identifier);
      this._gaService.sendEvent(EventCategory.Widget, WidgetEvents.NumberChange,
        `${this.configuration.identifier}_${this.configuration.value}`);
    }
}
