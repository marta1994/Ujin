import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-size-measure',
  templateUrl: './size-measure.component.html',
  styleUrls: ['./size-measure.component.less']
})
export class SizeMeasureComponent implements OnInit {

    public textSnippets = [
        {
            order: 1,
            title: "forms.sizeMeasure.title1",
            text: "forms.sizeMeasure.text1"
        },
        {
            order: 2,
            title: "forms.sizeMeasure.title2",
            text: "forms.sizeMeasure.text2"
        },
        {
            order: 3,
            title: "forms.sizeMeasure.title3",
            text: "forms.sizeMeasure.text3"
        }
    ];

  constructor() { }

  ngOnInit() {
  }

}
