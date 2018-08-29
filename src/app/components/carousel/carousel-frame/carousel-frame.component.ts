import { Component, Input, OnInit, OnDestroy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'fly-carousel-frame',
  templateUrl: './carousel-frame.component.html',
  styleUrls: ['./carousel-frame.component.scss']
})
export class CarouselFrameComponent implements OnInit {
  @ContentChild(TemplateRef) carouselItemType: TemplateRef<any>;
  @Input() carouselItems: Array<any>;
  @Input() enableAutoPlay: boolean = true;
  @Input() msSlideDuration: number = 6000;
  @Input() navArrowControls: boolean = true;
  carouselDirection = null;
  currentItemIndex = 0;
  previousItemIndex = null;
  autoPlay: any;
  constructor() { }

  ngOnInit() {
    this.resetAutoPlay();
  }

  ngOnDestroy() {
    clearInterval(this.autoPlay);
  }

  // Carousel Navigation
  shiftBackward() {
    this.carouselDirection = 'left-to-right';
    this.previousItemIndex = this.currentItemIndex;
    this.currentItemIndex = (this.currentItemIndex > 0) ? this.currentItemIndex - 1 : this.carouselItems.length - 1;
  }

  shiftForward() {
    this.carouselDirection = 'right-to-left';
    this.previousItemIndex = this.currentItemIndex;
    this.currentItemIndex = (this.currentItemIndex < this.carouselItems.length - 1) ? this.currentItemIndex + 1 : 0;
  }

  resetAutoPlay() {
    if (this.enableAutoPlay) {
      clearInterval(this.autoPlay);
      this.autoPlay = setInterval(() => {this.shiftForward();}, this.msSlideDuration);
    }
  }

  onSelectItemPosition(index) {
    if (index !== this.currentItemIndex) {
      this.carouselDirection = (index < this.currentItemIndex) ?  'left-to-right' : 'right-to-left';
      this.previousItemIndex = this.currentItemIndex;
      this.currentItemIndex = index;
      this.resetAutoPlay();
    }
  }

  onSelectShiftBackward() {
    this.shiftBackward();
    this.resetAutoPlay();
  }

  onSelectShiftForward() {
    this.shiftForward();
    this.resetAutoPlay();
  }

  // Carousel Item Positioning
  indicatorStatusColor(index) {
    if (index === this.currentItemIndex) {
      return 'active';
    }
  }

  itemPosition(index) {
    if (this.carouselDirection === 'right-to-left') {
      return this.animateRightToLeft(index);
    } else if (this.carouselDirection === 'left-to-right') {
      return this.animateLeftToRight(index);
    } else if (this.carouselDirection === null) {
      return this.setInitialPosition(index);
    }
  }

  animateRightToLeft(index) {
    if (index === this.currentItemIndex) {
      return ' slide-in-rtl';
    } else if (index === this.previousItemIndex) {
      return ' slide-out-rtl';
    } else {
      return ' hide-item';
    }
  }

  animateLeftToRight(index) {
    if (index === this.currentItemIndex) {
      return ' slide-in-ltr';
    } else if (index === this.previousItemIndex) {
      return ' slide-out-ltr';
    } else {
      return ' hide-item';
    }
  }

  setInitialPosition(index) {
    if (index !== this.currentItemIndex) {
      return ' hide-item';
    } else {
      return '';
    }
  }

}
