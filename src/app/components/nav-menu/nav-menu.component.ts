import { Component, OnInit } from '@angular/core';
import { allNavAnimations } from '@animations/nav.animations'
import { MediaQueryService } from '@services/media-query.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [allNavAnimations]
})
export class NavMenuComponent implements OnInit {


  public isCollapsed: boolean = true;
  private navList = [
    { link: 'home', text: 'HOME' },
    { link: 'examples', text: 'EXAMPLES' }
    // { link: 'about', text: 'TEAM' },
    // { link: 'contact', text: 'CONTACT' }
  ];

  constructor(
    private querySvc: MediaQueryService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  showArrowButton() {
    const queryGroup = this.querySvc.deviceGroup.value; //  Alternative to subscribing since I'll be calling this function every resize anyway
    return !(queryGroup == 'desktop' || queryGroup == 'iPadLandscape' || queryGroup == 'iPadPortrait');
  }

  scrollTo(selector: string) {
    console.log(this.router.url);
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']).then(_ => {
        setTimeout(() => {
          const element = document.getElementById(selector);
          console.log(element);
          element.scrollIntoView({ behavior: 'smooth' });
        }, 420);
      });
    }
    else {
      const element = document.getElementById(selector);
      console.log(element);
      element.scrollIntoView({ behavior: 'smooth' });
    }

  }


  /*showNavBar() {
      if (this.qrySvc.desktop || this.qrySvc.iPadLandscape || this.qrySvc.iPadPortrait)
          return true;
      else return false;
  }*/

}
