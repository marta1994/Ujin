import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.less']
})
export class ImageTextComponent implements OnInit {

  @Input()
  public startTextKey: string;

  @Input()
  public endTextKey: string;

  @Input()
  public images: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
