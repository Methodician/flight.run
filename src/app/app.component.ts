import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';

declare var dataLayer: any;

@Component({
  selector: 'fly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.distinctUntilChanged((previous: any, current: any) => {
      // Subscribe to any `NavigationEnd` events where the url has changed
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {
      dataLayer.push(
        {
          event: 'pageview',
          page: { path: x.url }
        });
    });
  }

}
