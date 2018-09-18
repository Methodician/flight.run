import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as smoothscroll from 'smoothscroll-polyfill';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'fly-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  // public user: boolean = (this.authSvc.loggedIn);
  toggleOn: boolean = false;

  linkList = [
    { link: 'home', text: 'Home', scroll: false },
    { link: 'case-studies', text: 'Case Studies', scroll: false },
    { link: 'blog', text: 'Blog', scroll: false }
    // { link: 'home', text: 'Contact', scroll: true, scrollTarget: 'contact' }
  ];

  constructor(private authSvc: AuthService, private router: Router) {
    smoothscroll.polyfill();
  }

  ngOnInit() {
  }

  checkWindowWidth() {
    this.toggleOn = (window.innerWidth >= 640) ? false : this.toggleOn;
  }

  toggleStatus() {
    return (this.toggleOn) ? ' toggle-on' : '';
  }

  dropdownStatus() {
    return (this.toggleOn) ? ' show' : '';
  }

  onActivateScroll(selector: string, link: string) {
    if (this.router.url !== ('/' + link)) {
      setTimeout(() => { this.scrollToTarget(selector); }, 750);
    } else {
      this.scrollToTarget(selector);
    }
  }

  scrollToTarget(selector: string) {
    document.getElementById(selector).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  logOut() {
    this.authSvc.signOut();
  }

}
