import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fly-carousel-item-supporting-image',
  templateUrl: './carousel-item-supporting-image.component.html',
  styleUrls: ['../carousel-shared/carousel-item.component.scss']
})
export class CarouselItemSupportingImageComponent implements OnInit {

  @Input() image;

  constructor() { }

  ngOnInit() {
  }

}
