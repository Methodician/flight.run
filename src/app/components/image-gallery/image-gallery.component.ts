import { Component, Input } from '@angular/core';

@Component({
  selector: 'fly-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  @Input() images;
  @Input() imageMaxHeight = '500px';
  selectedImageId = 0;
  constructor() { }

  selectImage(index) {
    this.selectedImageId = index;
  }

  isSelected(index) {
    return (index === this.selectedImageId) ? true : false;
  }

}
