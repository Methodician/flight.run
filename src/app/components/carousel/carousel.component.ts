import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fly-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
// carouselArray: string[] = [];
carouselLength: number;
currentItem: number = 0;
autoplay;
  constructor() { }

  ngOnInit() {
    this.carouselLength =  document.querySelectorAll('.carousel-inner .item').length;
    // this.autoplay = setInterval(() => {
    //   this.carouselForward();
    // }, 5000);
    // console.log(document.querySelectorAll('.carousel-inner .item').length);

    // for( let i = 0; i < this.carouselLength; i++) {
    //   if(i === 0){
    //     this.carouselArray[i] = "carousel-show";
    //   } else {
    //     this.carouselArray[i] = "carousel-hidden";
    //   }
    // }
    // document.getElementsByClassName('item').item(0).classList.add('carousel-show');

    // console.log("what is this array ", this.carouselArray);
  }

  carouselForward(){
    document.getElementsByClassName('item').item(this.currentItem).classList.add('slide-out-rtl', 'item-stage-right');
    document.getElementsByClassName('item').item(this.currentItem).classList.remove('slide-in-rtl');
    if (this.currentItem === (this.carouselLength - 1)){
      this.currentItem = 0;
    } else {
      this.currentItem++;
    }
    document.getElementsByClassName('item').item(this.currentItem).classList.remove('item-stage-right', 'slide-out-rtl'); 
    document.getElementsByClassName('item').item(this.currentItem).classList.add('slide-in-rtl');  
    // document.getElementsByClassName('item').item(this.currentItem).classList.add('carousel-stage-left');
    
    // document.getElementsByClassName('item').item(this.currentItem + 1).classList.add('carousel-slide');
    // if (this.currentItem === (this.carouselLength - 1)){
    //   this.currentItem = 0;
    // } else {
    //   this.currentItem++;
    // }
    // console.log(this.currentItem, "this is the new index");
    // if (document.getElementsByClassName('item').item(this.currentItem).classList.contains('carousel-hide')) {
    // **document.getElementsByClassName('item').item(this.currentItem).classList.remove('carousel-hide', 'carousel-hide-right');
    // }
    // } else {
    //   document.getElementsByClassName('item').item(this.currentItem).classList.remove('carousel-hidden');
    // }
  }

  carouselBackward(){
    var items = document.getElementsByClassName('item');

    items.item(this.currentItem).classList.add('slide-out-ltr', 'item-stage-left');
    items.item(this.currentItem).classList.remove('slide-in-rtl');
    // if (this.currentItem === 0){
    //   this.currentItem = this.carouselLength - 1;
    // } else {
    //   this.currentItem--;
    // }
    // console.log(this.currentItem, "this is the new index");
    // // if (document.getElementsByClassName('item').item(this.currentItem).classList.contains('carousel-hide')) {
    // document.getElementsByClassName('item').item(this.currentItem).classList.remove('carousel-slide', 'carousel-slide-right');
  }

  clickForward(){
    clearInterval(this.autoplay);
    this.carouselForward();
  }
}
