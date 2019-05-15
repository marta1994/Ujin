import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MobileGaService } from '../googleAnalytics/mobile.ga.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.less']
})
export class MobileComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private gaService: MobileGaService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
  }
}
