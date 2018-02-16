import { Component, OnInit } from '@angular/core';
import { allNavAnimations } from '@animations/nav.animations'
import { MediaQueryService } from '@services/media-query.service';
import { Router } from '@angular/router';
import * as smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'fly-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [allNavAnimations]
})
export class NavMenuComponent implements OnInit {

  public deviceGroup: string;
  public isCollapsed: boolean = true;

  linkList = [
    { link: '', text: this.deviceGroup },
    { link: 'home', text: 'HOME' },
    { link: 'examples', text: 'EXAMPLES' },
  ];

  scrollList = [
    { link: 'about', text: 'ABOUT US' },
    { link: 'team', text: 'TEAM' },
    { link: 'work', text: this.showArrowButton() ? 'WORK' : 'OUR WORK' },
    { link: 'testimonial', text: 'TESTIMONIALS' },
    { link: 'contact', text: 'CONTACT' },
  ]

  constructor(
    private querySvc: MediaQueryService,
    private router: Router
  ) {
    smoothscroll.polyfill();
  }

  ngOnInit() {
    this.querySvc.deviceGroup.subscribe(group => {
      this.deviceGroup = group;
    });
  }

  showArrowButton() {
    // const queryGroup = this.querySvc.deviceGroup.value; //  Alternative to subscribing since I'll be calling this function every resize anyway
    return !(this.deviceGroup == 'desktop' || this.deviceGroup == 'iPadLandscape' || this.deviceGroup == 'iPadPortrait');
  }

  scrollTo(selector: string) {
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']).then(_ => {
        setTimeout(() => {
          const element = document.getElementById(selector);
          element.scrollIntoView({ behavior: 'smooth' });
        }, 420);
      });
    }
    else {
      const element = document.getElementById(selector);
      element.scrollIntoView({ behavior: 'smooth' });
    }

  }


  /*showNavBar() {
      if (this.qrySvc.desktop || this.qrySvc.iPadLandscape || this.qrySvc.iPadPortrait)
          return true;
      else return false;
  }*/

}
