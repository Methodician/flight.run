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
  selectorShiftAmount;
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

  // Selector Navigation Functions
  setSelectorMaxOffset() {
    this.selectorMaxOffset = this.selectorTrack.nativeElement.clientWidth - this.selectorStrip.nativeElement.scrollWidth;
    this.alignSelectorOffset();
    this.calcSelectorShiftAmount();
  }

  alignSelectorOffset() {
    if (this.selectorMaxOffset === 0) {
      this.selectorOffset = 0;
    } else if (this.selectorOffset < this.selectorMaxOffset) {
      this.selectorOffset = this.selectorMaxOffset;
    }
  }

  calcSelectorShiftAmount() {
    this.selectorShiftAmount = Math.ceil(this.selectorTrack.nativeElement.clientWidth * 0.8);
  }

  onShiftBackward() {
    this.selectorOffset = (this.selectorOffset < (this.selectorShiftAmount * -1)) ? this.selectorOffset + this.selectorShiftAmount : 0;
  }

  onShiftForward() {
    this.selectorOffset = (this.selectorOffset > (this.selectorMaxOffset + this.selectorShiftAmount)) ? this.selectorOffset - this.selectorShiftAmount : this.selectorMaxOffset;
  }

}
