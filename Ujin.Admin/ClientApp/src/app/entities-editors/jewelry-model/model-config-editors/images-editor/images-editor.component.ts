import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JewelryModel, JewelryModelConfigType, ModelConfiguration } from '../../models';
import { IHintSource } from 'src/app/ui-components/hint-input/hint-input.component';
import { SelectorOptions, OptionsSource } from '../options-editor/options-editor.component';

@Component({
  selector: 'app-images-editor',
  templateUrl: './images-editor.component.html',
  styleUrls: ['./images-editor.component.less']
})
export class ImagesEditorComponent implements OnInit, OnChanges {

  @Input()
  public jewelryModel: JewelryModel

  public imageList: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.jewelryModel) {
      this.imageList = JSON.parse(this.jewelryModel.imagesPattern);
    }
  }

  private _imageHintSource: IHintSource[];

  public get imageHintSource(): IHintSource[] {
    if (this._imageHintSource == null) {
      this._imageHintSource = [<IHintSource>{ name: "model", children: [{ name: "identifier" }] }].concat(
        this.jewelryModel.configurations.map(cfg => {
          switch (cfg.configurationType) {
            case JewelryModelConfigType.Number:
              return { name: cfg.identifier, children: [{ name: "value" }] };
            case JewelryModelConfigType.Options: {
              return this.getOptionsHintSource(cfg);
            }
            default: return null;
          }
        }));
    }
    return this._imageHintSource;
  }

  private getOptionsHintSource(cfg: ModelConfiguration): IHintSource {
    let opts = new SelectorOptions(cfg.configurationOptions);
    switch (opts.optionsSource) {
      case OptionsSource.Metal:
        return { name: cfg.identifier, children: [{ name: "identifier" }] };
      case OptionsSource.Gemstone:
        return {
          name: cfg.identifier, children: [
            { name: "identifier" },
            {
              name: "gemSource",
              children: [{ name: "identifier" }]
            },
            {
              name: "gemCut",
              children: [{ name: "identifier" }]
            },
            {
              name: "gemClass",
              children: [{ name: "identifier" }]
            }
          ]
        };
      case OptionsSource.Custom:
        return { name: cfg.identifier, children: [{ name: "identifier" }, { name: "value" }] };
      default: return null;
    }
  }

  public trackItems(ind: number): any {
    return ind;
  }

  public addNew() {
    this.imageList.push("NEW_IMG.png");
  }

  public delete(ind: number) {
    this.imageList.splice(ind, 1);
  }

  public acceptChanges() {
    this.jewelryModel.imagesPattern = JSON.stringify(this.imageList);
  }
}
