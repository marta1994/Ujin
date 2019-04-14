import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adventages',
  templateUrl: './adventages.component.html',
  styleUrls: ['./adventages.component.less']
})
export class AdventagesComponent implements OnInit {

  private readonly _adventages: Adventage[];

  constructor() {
    this._adventages = [];
    for (var i = 0; i < 4; ++i) {
      this._adventages.push({
        order: i + 1,
        title: `adventages.adv${i + 1}.title`,
        description: `adventages.adv${i + 1}.description`,
      });
    }
  }

  ngOnInit() {
  }

  public get adventages(): Adventage[] {
    return this._adventages;
  }
}

interface Adventage {
  title: string;
  order: number;
  description: string;
}
