import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.less']
})
export class ImageTextComponent implements OnInit {

  @Input()
  public startTextKey: string;

  public startText: string;

  @Input()
  public endTextKey: string;

  public endText: string;

  @Input()
  public images: string[] = [];

  constructor(private translation: TranslationService) {
  }

  ngOnInit() {
    this.translation.init().then(() => {
      this.startText = this.translation.translate(this.startTextKey);
      this.endText = this.translation.translate(this.endTextKey);
    });
  }
}
