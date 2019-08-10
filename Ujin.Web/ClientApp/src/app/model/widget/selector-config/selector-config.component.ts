import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { SelectorConfiguration, OptionsSource, Gemstone, NamedEntity, CustomOption } from '../../models';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, WidgetEvents } from 'src/app/google-analytics/events';

@Component({
  selector: 'app-selector-config',
  templateUrl: './selector-config.component.html',
  styleUrls: ['./selector-config.component.less'],
  animations: [
    trigger('collapseSubMenu', [
      state('void', style({
        height: 0
      })),
      transition('* -> void', animate('0.3s ease')),
    ])
  ]
})
export class SelectorConfigComponent implements OnInit, OnChanges {

  @Input()
  public configuration: SelectorConfiguration;

  @Output()
  public onChange: EventEmitter<string> = new EventEmitter<string>();

  public OptionsSource = OptionsSource;

  public gemstones: GemNode[];

  public selectedNode: GemNode;

  public selectedGem: Gemstone;

  constructor(private _gaService: GaService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.configuration || !this.configuration) return;
    if (this.configuration.optionsSource !== OptionsSource.Gemstone) return;
    this.gemstones = [];
    this.configuration.gemstoneSource.forEach(g => {
      let gemNode = this.gemstones.find(gem => gem.classId === g.gemstoneClass.identifier);
      if (gemNode == null) {
        gemNode = new GemNode();
        gemNode.classId = g.gemstoneClass.identifier;
        gemNode.nameKey = g.gemstoneClass.nameKey;
        gemNode.color = g.color.colorHexCode;
        gemNode.children = [];
        this.gemstones.push(gemNode);
      }
      gemNode.children.push(g);
    });
    this.gemstones.forEach(g => g.children = g.children.sort(
      (c1, c2) => c1.gemstoneSource.identifier.localeCompare(c2.gemstoneSource.identifier)));
    this.selectedGem = this.configuration.gemstoneSource.find(
      g => g.identifier.toLowerCase() === (this.configuration.value + "").toLowerCase());
    this.selectedNode = this.gemstones.find(gn => gn.classId.toLowerCase() === this.selectedGem.gemstoneClass.identifier.toLowerCase());
  }

  public shiftValue(shift: number) {
    let shiftInd = (ind, mod) => {
      return (ind + shift + mod) % mod;
    }

    switch (this.configuration.optionsSource) {
      case OptionsSource.Gemstone: {
        let gemInd = this.gemstones.indexOf(this.selectedNode);
        gemInd = shiftInd(gemInd, this.gemstones.length);
        this.selectGemClass(this.gemstones[gemInd]);
        break;
      }
      case OptionsSource.Metal: {
        let ind = this.configuration.metalSource.findIndex(s => this.isSelected(s));
        ind = shiftInd(ind, this.configuration.metalSource.length);
        this.selectItem(this.configuration.metalSource[ind].identifier);
        break;
      }
      case OptionsSource.Custom: {
        let ind = this.configuration.customOptions.findIndex(s => this.isSelected(s));
        ind = shiftInd(ind, this.configuration.customOptions.length);
        this.selectItem(this.configuration.customOptions[ind].identifier);
        break;
      }
    }
  }

  public isSelected(item: GemNode | Gemstone | NamedEntity | CustomOption): boolean {
    if (item instanceof GemNode) {
      return item == this.selectedNode;
    }
    if (item instanceof Gemstone) {
      return item == this.selectedGem;
    }
    return (this.configuration.value + "").toLowerCase() === item.identifier.toLowerCase();
  }

  public selectItem(identifier: string) {
    if (this.configuration.value === identifier) return;
    this.configuration.value = identifier;
    this.onChange.emit(this.configuration.identifier);
    this._gaService.sendEvent(EventCategory.Widget, WidgetEvents.SelectorOptionsClick,
      `${this.configuration.identifier}_${identifier}`);
  }

  public selectGemClass(gemNode: GemNode) {
    if (this.selectedNode === gemNode) return;
    this.selectedNode = gemNode;
    var gem = this.selectedNode.children.find(
      g => g.gemstoneSource.identifier.toLowerCase() === this.selectedGem.gemstoneSource.identifier.toLowerCase());
    if (gem == null)
      gem = this.selectedNode.children[0];
    this.selectGem(gem);
  }

  public selectGem(gem: Gemstone) {
    if (this.selectedGem === gem) return;
    this.selectedGem = gem;
    this.configuration.value = this.selectedGem.identifier;
    this.onChange.emit(this.configuration.identifier);
    this._gaService.sendEvent(EventCategory.Widget, WidgetEvents.SelectorOptionsClick,
      `${this.configuration.identifier}_${gem.identifier}`);
  }
}

class GemNode {
    public nameKey: string;
    public color: string;
    public classId: string;
    public children: Gemstone[];
}
