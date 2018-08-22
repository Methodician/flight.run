import { Component, OnInit, OnChanges } from '@angular/core';
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

  linkList = [
    { link: 'examples', text: 'Examples', scroll: false },
    { link: 'blog', text: 'Blog', scroll: false },
    { link: 'home', text: 'Contact', scroll: true, scrollAnchor: 'contact' },
  ];

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {
    smoothscroll.polyfill();
  }

  ngOnInit() {
    // console.log(' this user in nav' + this.user);
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
    this.authSvc.signOut();
  }

}
