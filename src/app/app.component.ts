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

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.distinctUntilChanged((previous: any, current: any) => {
      // Subscribe to any `NavigationEnd` events where the url has changed
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {
      gtag('config', 'UA-113146433-1', { 'page_path': x.url });
    })
  }

}
