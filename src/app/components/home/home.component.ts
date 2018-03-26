import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '@services/media-query.service';
import { DeviceGroups } from '@enums/device-groups.enum';
import { routerTransition } from '@animations/router.animations';
import { RouterModule } from '@angular/router';

// For Carousel, and animations
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
import { HostListener, Inject, ViewChild } from '@angular/core';
import { listAppears } from '@animations/list.animations';
import { floatingShip } from '@animations/floatingShip.animations';
import { NgClass } from '@angular/common';
import { trigger } from '@angular/animations';

@Component({
  selector: 'fly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition, listAppears, floatingShip],
  host: { '[@routerTransition]': '' }
})
export class HomeComponent implements OnInit {
  @ViewChild('doList') divList;
  @ViewChild('workCarousel') workCarousel;
  @ViewChild('testimonialCarousel') testmonialCarousel;

  // For animations on mobile
  phoneListStates: string[] = ['', '', '', '', ''];

  public listStates: string[] = ["inactive", "inactive", "inactive", "inactive", "inactive"];
  public currentList: number = 1;

  public carouselTestimonial: NguCarousel;
  public carouselWork: NguCarousel;
  carouselMoveRight: boolean = true;

  floatingShip: string = 'down';

  currentDevice: DeviceGroups = DeviceGroups.desktop;

  constructor(
    private mediaSvc: MediaQueryService
  ) {
    //  Create a new SPA "pageview" for Mouseflow:
    const win = window as any;
    win._mfq = win._mfq || [];
    win._mfq.push(['newPageView', '/home']);
  }

  ngOnInit() {
    this.mediaSvc.deviceGroup.subscribe(group => {
      this.currentDevice = group;
    });

    if (this.currentDevice.includes('phone')) {
      return;
    } else {
      setInterval(() => {
        this.floatingShip === 'up' ? this.floatingShip = 'down' : this.floatingShip = 'up';
      }, 3000);
    }

    this.carouselWork = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 1500,
      // interval: 4000,
      point: {
        visible: false
      },
      load: 2,
      loop: true,
      touch: true
    }

    this.carouselTestimonial = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 2000,
      // interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 25px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            border: 1px solid rgba(255, 81, 116, 1);
            background: rgba(0, 0, 0, 0);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: rgba(255, 81, 116, 1);
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    }
  }
  // END of onInit

  @HostListener("window:scroll", []) windowScroll() {
    var triggerPosition: number = this.divList.nativeElement.offsetTop - (window.innerHeight / 2);
    console.log("this is the trigger position ", this.divList.nativeElement.offsetTop);
    if (window.pageYOffset >= triggerPosition) {
      if (this.currentDevice.includes("phone") && this.listStates[0] === "inactive") {
        let time = 0;
        for (let i = 0; i < this.phoneListStates.length; i++) {
          setTimeout(() => {
            this.phoneListStates[i] = "list-appear";
          }, time);
          time = (i + 1) * 800;
        }
      } else {
        console.log("animation is playing");
        this.listStates[3] = "active3";
        this.listStates[0] = "active";
      }
    } else {
      // if you want to make it a repeating animation
      // for (let i = 0; i < this.listStates.length; i++){
      //   this.listStates[i] = "inactive";
      //   this.currentList = 1;
      // }
    }
  }


  onmoveFn(data: NguCarouselStore) {
  }
  animationDone(e: any) {
    console.log("list state 2", this.listStates[2]);
    // this.listStates[this.currentList] = "active";
    // if (this.listStates[0] === "active" && this.currentList < 5){
    //   console.log(this.currentList);
    //   this.listStates[this.currentList] = "active"+this.currentList;
    //   this.currentList++;
    // }
    if (this.listStates[2] === "active2") {
      this.listStates[4] = "active4";
    } else if (this.listStates[0] === "active" && this.currentList === 1) {
      this.listStates[1] = "active1";
      this.listStates[2] = "active2";
      console.log(this.listStates);
    }
  }
}
