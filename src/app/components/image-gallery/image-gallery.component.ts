import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'fly-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  @Input() images;
  @Input() imageMaxHeight = '500px';
  selectedImageId = 0;
  selectorOffset = 0;
  selectorMaxOffset;
  @ViewChild('selectorTrack') selectorTrack: ElementRef;
  @ViewChild('selectorStrip') selectorStrip: ElementRef;
  constructor() { }

  ngDoCheck() {
    this.setSelectorMaxOffset();
  }

  selectImage(index) {
    this.selectedImageId = index;
  }

  isSelected(index) {
    return (index === this.selectedImageId) ? true : false;
  }

  setSelectorMaxOffset() {
    this.selectorMaxOffset = this.selectorTrack.nativeElement.clientWidth - this.selectorStrip.nativeElement.scrollWidth;
    if (this.selectorMaxOffset === 0) {
      this.selectorOffset = 0;
    } else if (this.selectorOffset < this.selectorMaxOffset) {
      this.selectorOffset = this.selectorMaxOffset;
    }
  }

  onShiftBackward() {
    this.selectorOffset = (this.selectorOffset < -100) ? this.selectorOffset + 100 : 0;
  }

  onShiftForward() {
    this.selectorOffset = (this.selectorOffset > (this.selectorMaxOffset + 100)) ? this.selectorOffset - 100 : this.selectorMaxOffset;
  }

}
