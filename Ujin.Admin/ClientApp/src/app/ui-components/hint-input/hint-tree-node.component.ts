import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from "@angular/core";
import { HintSourceWrapper } from "./hint-input.component";

@Component({
  selector: 'app-hint-tree-node',
  template: `<div class="tree-node">
              <span class="node-name" (click)="onInternalNodeClick(node)"
                      [ngClass]="{'leaf': !node.children || node.children.length == 0}">
                {{node.name}}
              </span>
              <div class="children">
                  <app-hint-tree-node *ngFor="let child of node.children; index as i; trackBy: trackItems"
                        [node]="child" (onNodeClick)="onInternalNodeClick($event)">
                  </app-hint-tree-node>
              </div>
            </div>`,
  styleUrls: []
})
export class HintTreeNodeComponent implements OnChanges {

  @Input()
  public node: HintSourceWrapper;

  @Output()
  public onNodeClick: EventEmitter<HintSourceWrapper> = new EventEmitter<HintSourceWrapper>();

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public trackItems(index: number): any {
    return index;
  }

  public onInternalNodeClick(node: HintSourceWrapper) {
    this.onNodeClick.emit(node);
  }
}
