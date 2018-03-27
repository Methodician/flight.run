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
export class HomeComponent implements OnInit{
  @ViewChild('doList') divList;

  // For animations on mobile
  phoneListStates: string[] = ['', '', '', '', ''];

  public listStates: string[] = ["inactive", "inactive", "inactive", "inactive", "inactive"];
  public currentList: number = 1;

  floatingShip: string = 'down';

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

    if (this.currentDevice.includes('phone')) {
      return;
    } else {
      setInterval(()=> {
        this.floatingShip === 'up' ? this.floatingShip = 'down' : this.floatingShip = 'up';
      }, 3000);
    }
  }
  // END of onInit

  @HostListener("window:scroll", []) windowScroll(){
    var triggerPosition: number = this.divList.nativeElement.offsetTop - (window.innerHeight / 2);
    // console.log("this is the trigger position ", this.divList.nativeElement.offsetTop);
    if (window.pageYOffset >= triggerPosition) {
      if (this.currentDevice.includes("phone") && this.listStates[0] === "inactive") {
        let time = 0;
        for (let i = 0; i < this.phoneListStates.length; i++){
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

  animationDone(e:any){
    console.log("list state 2", this.listStates[2]);
    // this.listStates[this.currentList] = "active";
    // if (this.listStates[0] === "active" && this.currentList < 5){
    //   console.log(this.currentList);
    //   this.listStates[this.currentList] = "active"+this.currentList;
    //   this.currentList++;
    // }
    if (this.listStates[2] === "active2") {
      this.listStates[4] = "active4";
    } else if (this.listStates[0] === "active" && this.currentList === 1){
      this.listStates[1] = "active1";
      this.listStates[2] = "active2";
      console.log(this.listStates);
    }
  }
}
