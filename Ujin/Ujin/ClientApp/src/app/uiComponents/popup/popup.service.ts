import {
  Injectable, ComponentFactoryResolver,
  ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Type
} from '@angular/core';
import { PopupComponent, ChildComponentConfig } from './popup.component';
import { OnAction } from './OnAction';

@Injectable()
export class PopupService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

  public open(
    componentType: Type<OnAction>,
    config: PopupConfig = {},
    childConfig: ChildComponentConfig = {}): ComponentRef<PopupComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    componentRef.instance.childComponentType = componentType;
    componentRef.instance.childComponentConfig = childConfig;
    componentRef.instance.closeAction.subscribe(() => {
      this.close(componentRef);
    });
    if (config.width != null) componentRef.instance.width = config.width;
    if (config.height != null) componentRef.instance.height = config.height;
    if (config.showCloseButton != null) componentRef.instance.showCloseButton = config.showCloseButton;

    return componentRef;
  }

  public close(popupComponent: ComponentRef<PopupComponent>) {
    this.appRef.detachView(popupComponent.hostView);
    popupComponent.destroy();
  }
}

interface PopupConfig {
  width?: string;
  height?: string;
  showCloseButton?: boolean;
}
