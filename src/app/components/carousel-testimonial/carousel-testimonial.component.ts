import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'fly-carousel-testimonial',
  templateUrl: './carousel-testimonial.component.html',
  styleUrls: ['./carousel-testimonial.component.scss']
})
export class CarouselTestimonialComponent implements OnInit {

  carouselLength: number;
  currentItem = 0;
  autoplay: any;
  autoTimeout: any;
  items: HTMLCollectionOf<Element>;
  constructor() { }

  ngOnInit() {
    this.items = document.getElementsByClassName('testimonial-item');
    this.carouselLength =  this.items.length;
    this.autoplay = setInterval(() => {
      this.testimonialCarouselForward();
    }, 15000);
  }

  ngOnDestroy() {
    clearInterval(this.autoplay);
    clearTimeout(this.autoTimeout);
  }

  testimonialCarouselForward() {
    // document.getElementsByClassName('item').item(this.currentItem).classList.add('slide-out-rtl', 'item-stage-right');
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-out-rtl');
    this.items
      .item(this.currentItem)
      .classList
      .remove('slide-in-rtl', 'slide-in-ltr');
    if (this.currentItem === (this.carouselLength - 1)) {
      this.currentItem = 0;
    } else {
      this.currentItem++;
    }
    this.items
      .item(this.currentItem)
      .classList
      .remove('item-stage-right', 'slide-out-rtl', 'slide-out-ltr');
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-in-rtl');

  }

  testimonialCarouselBackward() {
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-out-ltr');
    this.items
      .item(this.currentItem)
      .classList
      .remove('slide-in-rtl', 'slide-in-ltr');
    if (this.currentItem === 0) {
      this.currentItem = this.carouselLength - 1;
    } else {
      this.currentItem--;
    }
    this.items
      .item(this.currentItem)
      .classList
      .remove('item-stage-right', 'slide-out-rtl', 'slide-out-ltr');
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-in-ltr');
  }

  clickTestimonialButton(direction: string): void {
    if (direction === 'next') {
      this.testimonialCarouselForward();
    } else {
      this.testimonialCarouselBackward();
    }
    clearInterval(this.autoplay);
    clearTimeout(this.autoTimeout);
    this.autoTimeout = setTimeout(() => {
      this.autoplay = setInterval(() => {
        this.testimonialCarouselForward();
      }, 15000);
    }, 15000);
  }
}
