import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fly-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.scss']
})
export class ImageSlideComponent implements OnInit {
  @Input() image;
  constructor() { }

  ngOnInit() {
  }

}
