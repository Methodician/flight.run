import { Component, OnInit } from '@angular/core';
import { allNavAnimations } from '@animations/nav.animations'
import { MediaQueryService } from '@services/media-query.service';

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
    { link: 'apps', text: 'EXAMPLES' },
    { link: 'about', text: 'TEAM' },
    { link: 'contact', text: 'CONTACT' }
  ];

  constructor(private querySvc: MediaQueryService) { }

  ngOnInit() {
  }

  showArrowButton() {
    const queryGroup = this.querySvc.deviceGroup.value; //  Alternative to subscribing since I'll be calling this function every resize anyway
    return !(queryGroup == 'desktop' || queryGroup == 'iPadLandscape' || queryGroup == 'iPadPortrait');
  }

  clickedOutside() {
    console.log('clicked');
  }


  /*showNavBar() {
      if (this.qrySvc.desktop || this.qrySvc.iPadLandscape || this.qrySvc.iPadPortrait)
          return true;
      else return false;
  }*/

}
