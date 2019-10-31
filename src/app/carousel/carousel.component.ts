import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
NumberRegistered=100;
NumberUploaded=10;
NumberViewed=1000;
  constructor() { }

  ngOnInit() {
  }

}
