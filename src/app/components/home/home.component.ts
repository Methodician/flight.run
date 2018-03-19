import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '@services/media-query.service';
import { DeviceGroups } from '@enums/device-groups.enum';
import { routerTransition } from '@animations/router.animations';
import { RouterModule } from '@angular/router';

// For Carousel, and animations
// import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
import { NgxCarousel } from 'ngx-carousel';
import { HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../services/window.service';
import { listAppears } from '@animations/list.animations';
import { NgClass } from '@angular/common'; 

@Component({
  selector: 'fly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition, listAppears],
  host: { '[@routerTransition]': '' }
})
export class HomeComponent implements OnInit{
  @ViewChild('doList') divList;
  
  // For animations on mobile
  phoneListStates: string[] = ['', '', '', '', ''];
  public listStates: string[] = ["inactive", "inactive", "inactive", "inactive", "inactive"];
  public currentList: number = 1;

  // public carouselWork: NguCarousel;
  // public carouselTestimonial: NguCarousel;
  public carouselWork: NgxCarousel;
  public carouselTestimonial: NgxCarousel;

  currentDevice: DeviceGroups = DeviceGroups.desktop;
  
  constructor(
    private mediaSvc: MediaQueryService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private windowish: Window
  ) {
    //  Create a new SPA "pageview" for Mouseflow:
    const win = window as any;
    win._mfq = win._mfq || [];
    win._mfq.push(['newPageView', '/home']);

    //  Create path variable for mouseflow heatmaps (seems like it failed)
    // const mouseflowPathScript = (document.getElementById('mfPathScript') as any);
    // mouseflowPathScript.text = "var mouseflowPath = '/home';";
  }

  ngOnInit() {
    this.mediaSvc.deviceGroup.subscribe(group => {
      this.currentDevice = group;
    });

    this.carouselWork = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 1000,
      interval: 4000,
      point: {
        visible: false
      },
      load: 1,
      loop: true,
      touch: true,
      // animation: 'lazy'
    }

    this.carouselTestimonial = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
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
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            border: 1px solid rgba(255, 81, 116, 1);
            background: rgba(0, 0, 0, 0);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: rgba(255, 81, 116, 1);
              width: 10px;
          }
        `
      },
      load: 1,
      loop: true,
      touch: true
    }
  }

  
  @HostListener("window:scroll", [])
  onWindowScroll(){
    var triggerPosition: number = this.divList.nativeElement.offsetTop - (this.windowish.innerHeight * 3 / 4);
    if ( this.windowish.pageYOffset >= triggerPosition){
      if (this.currentDevice.includes("phone") && this.listStates[0] === "inactive"){
        let time = 0;
        for (let i = 0; i < this.phoneListStates.length; i++){
          setTimeout(()=>{
            this.phoneListStates[i] = "list-appear";
          }, time)
          time = (i+1)*800;
        }
      } else {
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

  animationDone(e:any){
    // this.listStates[this.currentList] = "active";
    if (this.listStates[0] === "active" && this.currentList < 5){
      this.listStates[this.currentList] = "active";
      this.currentList++;
    }
  }

  goOff(event: Event){
    console.log("this event is what", event);
  }
}