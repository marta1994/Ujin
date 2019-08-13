export enum EventCategory {
  Widget = "widget",
  ModelPage = "modelPage",
  Carousel = "carousel",
  OrderPage = "orderPage",
  Cart = "cart",
  Catalog = "catalog",
  Menu = "menu"
}

export enum WidgetEvents {
  SelectorOptionsClick = "selectorOptionsClick",
  NumberChange = "numberChange",
  MenuClick = "menuClick"
}

export enum ModelPageEvents {
  OrderClick = "orderClick",
  CopyLinkClick = "copyLinkClick"
}

export enum CarouselEvents {
  ImageClick = "imageClick",
  ArrowNextClick = "arrowNextClick",
  ArrowPrevClick = "arrowPrevClick",
  SwipeNext = "swipeNext",
  SwipePrev = "swipePrev",
}

export enum OrderPageEvents {
  PlaceOrderClick = "placeOrderClick",
}

export enum CartEvents {
  AddProduct = "addProduct",
  RemoveProduct = "removeProduct",
  RemoveAllSku = "removeAllSku",
  Clear = "clear"
}

export enum CatalogEvents {
  ModelClick = "modelClick"
}

export enum MenuEvents {
  CatalogClick = "catalogClick",
  ContactsClick = "contactsClick"
}
