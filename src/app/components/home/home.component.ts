import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '@services/media-query.service';
import { DeviceGroups } from '@enums/device-groups.enum';
import { routerTransition } from '@animations/router.animations';

// kb: carousel
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';


@Component({
  selector: 'fly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class HomeComponent implements OnInit {
  public carouselBanner: NguCarousel;
  currentDevice: DeviceGroups = DeviceGroups.desktop;
  constructor(
    private mediaSvc: MediaQueryService
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
    this.carouselBanner = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
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
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            border: 2px solid rgba(0, 0, 0, 0.55);
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
  }
 
  /* It will be triggered on every slide*/
  onmoveFn(data: NguCarouselStore) {
    console.log(data);
  }
 
}

}
