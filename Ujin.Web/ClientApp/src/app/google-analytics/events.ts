export enum EventCategory {
  Widget = "widget",
  ModelPage = "modelPage",
  Carousel = "carousel",
  OrderPage = "orderPage",
  Cart = "cart",
  Catalog = "catalog",
  Menu = "menu",
  Header = "header"
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
    ModelClick = "modelClick",
    SortByPrice = "sortByPrice"
}

export enum MenuEvents {
    CatalogClick = "catalogClick",
    ContactsClick = "contactsClick",
    ShipmentClick = "shipmentPaymentClick",
    SizeClick = "sizeMeasureClick",
}

export enum HeaderEvents {
  CatalogClick = "catalogClick",
  ContactsClick = "contactsClick"
}
