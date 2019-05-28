import { Component, OnInit } from '@angular/core';
import { GemstoneService, GemSource } from '../gemstone.service';

@Component({
  selector: 'app-gem-source',
  templateUrl: './gem-source.component.html',
  styleUrls: ['./gem-source.component.less']
})
export class GemSourceComponent implements OnInit {

  private _gemSources: GemSource[];

  constructor(private _gemstoneService: GemstoneService) { }

  ngOnInit() {
    this._gemstoneService.loadGemSources()
      .then(res => this._gemSources = res)
      .catch(err => alert("Помилка завантаження. " + err));
  }

  public get gemSources(): GemSource[] {
    return this._gemSources;
  }

  public deleteItem(gemSrc: GemSource) {
    let ind = this._gemSources.indexOf(gemSrc);
    if (ind < 0) return;
    this._gemSources.splice(ind, 1);
  }

  public addNew() {
    this._gemSources.push({ id: -1, nameKey: "" });
  }

  public saveChanges() {
    this._gemstoneService.saveGemSources(this._gemSources)
      .then(() => location.reload())
      .catch(err => alert("Помидка при збереженні: " + err));
  }
}
