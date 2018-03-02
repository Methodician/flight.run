import { Component, OnInit } from '@angular/core';
import { allNavAnimations } from '@animations/nav.animations'
import { MediaQueryService } from '@services/media-query.service';
import { Router, RouterModule } from '@angular/router';
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
    // { link: '', text: this.deviceGroup },
    { link: 'home', text: 'Home' },
    { link: 'examples', text: 'Examples' },
  ];

  scrollList = [
    // { link: 'about', text: 'ABOUT US' },
    { link: 'team', text: 'About Us' },
    // { link: 'work', text: this.showArrowButton() ? 'Work' : 'Our Work' },
    { link: 'work', text: 'Our Work' },
    { link: 'testimonial', text: 'Testimonials' },
    { link: 'contact', text: 'Contact' },
  ]

  constructor(
    private querySvc: MediaQueryService,
    private router: Router
  ) {
    smoothscroll.polyfill();
  }

  ngOnInit() {
    this.querySvc.deviceGroup.subscribe(group => {
      console.log(group);
      this.deviceGroup = group;
    });
  }

  showArrowButton() {
    return !(this.deviceGroup == 'desktop' || this.deviceGroup == 'iPadLandscape' || this.deviceGroup == 'iPadPortrait');
  }

  showNavBar() {
    return (this.deviceGroup == 'desktop' || this.deviceGroup == 'iPadLandscape' || this.deviceGroup == 'iPadPortrait');
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




}
