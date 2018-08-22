import { Component, OnInit, OnChanges } from '@angular/core';
import { allNavAnimations } from '@animations/nav.animations';
import { MediaQueryService } from '@services/media-query.service';
import { Router, RouterModule } from '@angular/router';
import * as smoothscroll from 'smoothscroll-polyfill';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'fly-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [allNavAnimations]
})
export class NavMenuComponent implements OnInit {
  // public user: boolean = (this.authSvc.loggedIn);
  public deviceGroup: string;
  public isCollapsed = true;

  linkList = [
    // { link: '', text: this.deviceGroup },
    // { link: 'home', text: 'Home' },
    { link: 'examples', text: 'Examples' },
    { link: 'blog', text: 'Blog' }
  ];

  scrollList = [
    // { link: 'about', text: 'ABOUT US' },
    // { link: 'work', text: 'Our Work' },
    // { link: 'work', text: this.showArrowButton() ? 'Work' : 'Our Work' },
    // { link: 'partners', text: 'Testimonials' },
    // { link: 'team', text: 'Our Team' },
    { link: 'contact', text: 'Contact' },
  ];

  constructor(
    private authSvc: AuthService,
    private querySvc: MediaQueryService,
    private router: Router
  ) {
    smoothscroll.polyfill();
  }

  ngOnInit() {
    this.querySvc.deviceGroup.subscribe(group => {
      // console.log(group);
      this.deviceGroup = group;
      // console.log(' this user in nav' + this.user);

    });
  }


  showArrowButton() {
    return !(this.deviceGroup === 'desktop' || this.deviceGroup === 'iPadLandscape' || this.deviceGroup === 'iPadPortrait');
  }

  showNavBar() {
    return (this.deviceGroup === 'desktop' || this.deviceGroup === 'iPadLandscape' || this.deviceGroup === 'iPadPortrait');
  }

  scrollTo(selector: string) {
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(selector);
          element.scrollIntoView({ behavior: 'smooth' });
        }, 420);
      });
    } else {
      const element = document.getElementById(selector);
      element.scrollIntoView({ behavior: 'smooth' });
    }

  }

  logOut() {
    console.log('logout clicked'); // REMOVE
    this.authSvc.signOut();
  }




}
