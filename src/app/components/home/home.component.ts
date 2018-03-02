import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MediaQueryService } from '@services/media-query.service';
import { DeviceGroups } from '@enums/device-groups.enum';
import { routerTransition } from '@animations/router.animations';
import { RouterModule } from '@angular/router';

// kb: carousel
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
import { HostListener, Inject, ViewChild, ViewChildren } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('doList') divList;
  @ViewChildren('listOne,listTwo,listThree,listFour,listFive') listItems;
  
  public listState: string = "inactive";

  public carouselTestimonial: NguCarousel;
  public carouselWork: NguCarousel;

  currentDevice: DeviceGroups = DeviceGroups.desktop;
  
  constructor(
    private mediaSvc: MediaQueryService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
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

  ngAfterViewInit() {
    
  }

  
  @HostListener("window:scroll", [])
  onWindowScroll(){
    this.listItems.forEach(element => {
      console.log(element.nativeElement.offsetTop + " this is an item");
    });
    var triggerPosition: number = this.divList.nativeElement.offsetTop - (this.window.innerHeight * 3 / 4);
    if ( this.window.pageYOffset >= triggerPosition){
      this.listState = "active";
    } else {
      this.listState = "inactive";
    }
    // console.log(this.listState);
    // console.log("this state is " + this.listState);
    // console.log (triggerPosition + "this is the trigger position");
    console.log(this.window.pageYOffset + " ######## window page Y offset");
    // console.log(this.window.innerHeight);
    console.log(this.divList.nativeElement.offsetTop);
  }
  /* It will be triggered on every slide*/
  onmoveFn(data: NguCarouselStore) {
    // console.log(data);

  }
}