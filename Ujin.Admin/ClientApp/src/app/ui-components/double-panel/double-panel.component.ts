import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-double-panel',
  templateUrl: './double-panel.component.html',
  styleUrls: ['./double-panel.component.less']
})
export class DoublePanelComponent implements OnInit {

  @Input()
  public firstOpened: boolean = true;

  @Input()
  public disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public switchPanel() {
    this.firstOpened = !this.firstOpened;
  }

}
