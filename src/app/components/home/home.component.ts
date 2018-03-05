import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '@services/media-query.service';
import { DeviceGroups } from '@enums/device-groups.enum';
import { routerTransition } from '@animations/router.animations';
import { RouterModule } from '@angular/router';

// kb: carousel
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
import { HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../services/window.service';
import { listAppears } from '@animations/list.animations';

@Component({
  selector: 'fly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition, listAppears],
  host: { '[@routerTransition]': '' }
})
export class HomeComponent implements OnInit{
  @ViewChild('doList') divList;

  public listStates: string[] = ["inactive", "inactive", "inactive", "inactive", "inactive"];
  public currentList: number = 1;

  public carouselTestimonial: NguCarousel;
  public carouselWork: NguCarousel;

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
      speed: 400,
      interval: 4000,
      point: {
        visible: false,
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
            bottom: 40px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            border: 1px solid rgba(0, 0, 0, 1);
            background: rgba(0, 0, 0, 0);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: black;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: false,
      touch: true
    }

    this.carouselTestimonial = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
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

  
  @HostListener("window:scroll", [])
  onWindowScroll(){
    // to trigger the animations individually
    // this.listItems.forEach(element => {
    //   console.log(element.nativeElement.offsetTop + " this is an item");
    // });

    var triggerPosition: number = this.divList.nativeElement.offsetTop - (this.windowish.innerHeight * 3 / 4);
    if ( this.windowish.pageYOffset >= triggerPosition){
      this.listStates[0] = "active";
    } else {
      // if you want to make it a repeating animation
      // for (let i = 0; i < this.listStates.length; i++){
      //   this.listStates[i] = "inactive";
      //   this.currentList = 1;
      // }
    }
    console.log(this.windowish.pageYOffset + " ######## window page Y offset");
    console.log(window.scrollY + " this is the window's scroll Y");
    console.log(this.divList.nativeElement.isVisible);
    console.log(this.divList.nativeElement.offsetTop);
  }
  /* It will be triggered on every slide*/
  onmoveFn(data: NguCarouselStore) {
  }
  animationDone(e:any){
    // this.listStates[this.currentList] = "active";
    if (this.listStates[0] === "active" && this.currentList < 5){
      this.listStates[this.currentList] = "active";
      this.currentList++;
      console.log("hi this animation ended and we're at the list " + this.currentList);  
    }
  }
}