import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipment-payment',
  templateUrl: './shipment-payment.component.html',
  styleUrls: ['./shipment-payment.component.less']
})
export class ShipmentPaymentComponent implements OnInit {

    public textSnippets = [
        {
            title: "forms.shipment.title1",
            text: "forms.shipment.text1"
        },
        {
            title: "forms.shipment.title2",
            text: "forms.shipment.text2"
        },
        {
            title: "forms.shipment.title3",
            text: "forms.shipment.text3"
        }
    ];

  constructor() { }

  ngOnInit() {
  }

}
