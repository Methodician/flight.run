import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';

declare var gtag: Function;

@Component({
  selector: 'fly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
    // Mouseflow installation script:
    // const win = (<any>window);
    // win._mfq = win._mfq || [];
    // (function () {
    //   var mf = document.createElement("script");
    //   mf.type = "text/javascript"; mf.async = true;
    //   mf.src = "//cdn.mouseflow.com/projects/9490dbd4-5a0f-4ae5-9403-bc4371105801.js";
    //   document.getElementsByTagName("head")[0].appendChild(mf);
    // })();
  }

  ngOnInit() {
    if (/flight\.run/.test(window.location.hostname)) {
      this.router.events.distinctUntilChanged((previous: any, current: any) => {
        // Subscribe to any `NavigationEnd` events where the url has changed
        if (current instanceof NavigationEnd) {
          return previous.url === current.url;
        }
        return true;
      }).subscribe((x: any) => {
        gtag('config', 'UA-113146433-1', { 'page_path': x.url });
      });
    }

  }

}
