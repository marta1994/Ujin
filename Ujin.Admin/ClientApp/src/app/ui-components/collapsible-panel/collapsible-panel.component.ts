import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.less']
})
export class CollapsiblePanelComponent implements OnInit {

  @Input()
  public isPanelOpened: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  public switchOpened() {
    this.isPanelOpened = !this.isPanelOpened;
  }
}
