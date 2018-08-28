import { Component, Input } from '@angular/core';

@Component({
  selector: 'fly-carousel-item-supporting-image',
  templateUrl: './carousel-item-supporting-image.component.html',
  styleUrls: ['./carousel-item-supporting-image.component.scss']
})
export class CarouselItemSupportingImageComponent {
  @Input() imageUrl: string;
  @Input() imageCaption: string;
  constructor() { }

}
