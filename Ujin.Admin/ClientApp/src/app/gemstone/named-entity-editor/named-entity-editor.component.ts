import { Component, OnInit, Input } from '@angular/core';
import { GemstoneService, NamedEntity, GemNamedEntity } from '../gemstone.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-named-entity-editor',
  templateUrl: './named-entity-editor.component.html',
  styleUrls: ['./named-entity-editor.component.less']
})
export class NamedEntityEditorComponent implements OnInit {

  @Input()
  public entityType: GemNamedEntity;

  @Input()
  public placeholder: string;

  private _entities: NamedEntity[];

  constructor(private _gemstoneService: GemstoneService, route: ActivatedRoute) {
    this.entityType = (<BehaviorSubject<any>>route.data).value.entityType;
    this.placeholder = (<BehaviorSubject<any>>route.data).value.placeholder;
  }

  ngOnInit() {
    this._gemstoneService.loadGemSources(this.entityType)
      .then(res => this._entities = res)
      .catch(err => alert("Помилка завантаження. " + err));
  }

  public get entities(): NamedEntity[] {
    return this._entities;
  }

  public deleteItem(item: NamedEntity) {
    let ind = this._entities.indexOf(item);
    if (ind < 0) return;
    this._entities.splice(ind, 1);
  }

  public addNew() {
    this._entities.push({ id: -1, nameKey: "" });
  }

  public saveChanges() {
    this._gemstoneService.saveGemSources(this._entities, this.entityType)
      .then(() => location.reload())
      .catch(err => alert("Помидка при збереженні: " + err));
  }
}
