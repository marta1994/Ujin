import {
  Component, Input, Output, EventEmitter, ViewChild,
  ComponentRef, Type, ComponentFactoryResolver, ChangeDetectorRef, AfterViewInit, OnDestroy
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { OnAction } from './OnAction';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements AfterViewInit, OnDestroy {

  @Input()
  public showCloseButton: boolean;

  @Output()
  public closeAction: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public width: string = "400px";

  @Input()
  public height: string = "300px";

  private componentRef: ComponentRef<OnAction>;
  public childComponentType: Type<OnAction>;

  // add this:
  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  private loadChildComponent(componentType: Type<OnAction>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.actionHappened.subscribe(() => {
      this.closeAction.emit();
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  public get popupStyle(): object {
    return {
      "width": this.width,
      "height": this.height,
      "margin-top": `calc(-${this.height}/2)`,
      "margin-left": `calc(-${this.width}/2)`
    }
  }

  public closePopup() {
    this.closeAction.emit();
  }

  public onOverlayClicked(evt: MouseEvent) {
    this.closePopup();
  }

  public onPopupClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  public onCloseClicked(evt: MouseEvent) {
    this.closePopup();
  }
}
