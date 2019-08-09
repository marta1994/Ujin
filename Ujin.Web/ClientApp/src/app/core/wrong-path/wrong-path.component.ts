import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang/lang.service';

@Component({
  selector: 'app-wrong-path',
  templateUrl: './wrong-path.component.html',
  styleUrls: ['./wrong-path.component.less']
})
export class WrongPathComponent implements OnInit {

  constructor(private _langService: LangService) { }

  ngOnInit() {
  }

  public goToStartPage() {
    this._langService.navigateTo("");
  }
}
