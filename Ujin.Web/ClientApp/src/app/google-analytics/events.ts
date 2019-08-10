export enum EventCategory {
  Widget = "widget",
  ModelPage = "modelPage",
  Carousel = "carousel",
  OrderPage = "orderPage"
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
