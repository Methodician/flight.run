import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '@services/media-query.service';
import { DeviceGroups } from '@enums/device-groups.enum';
import { routerTransition } from '@animations/router.animations';

@Component({
  selector: 'fly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class HomeComponent implements OnInit {
  currentDevice: DeviceGroups = DeviceGroups.desktop;
  constructor(
    private mediaSvc: MediaQueryService
  ) { }

  ngOnInit() {
    this.mediaSvc.deviceGroup.subscribe(group => {
      this.currentDevice = group;
    });
  }

}
