import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceGroups } from '@enums/device-groups.enum'


@Injectable()
export class MediaQueryService {

  deviceGroup = new BehaviorSubject(DeviceGroups.desktop);

  constructor(ngZone: NgZone) {
    this.setDeviceGroup();
    window.onresize = (event) => {
      ngZone.run(() => {
        this.setDeviceGroup();
      });
    };
  }

  setDeviceGroup() {
    if (window.matchMedia('(min-width : 1200px)').matches) {
      this.deviceGroup.next(DeviceGroups.desktop);
      return;
    }
    if (window.matchMedia('(min-width: 1020px)').matches) {
      this.deviceGroup.next(DeviceGroups.iPadLandscape);
      return;
    }
    if (window.matchMedia('(min-width: 760px)').matches) {
      this.deviceGroup.next(DeviceGroups.iPadPortrait);
      return;
    }
    if (window.matchMedia('(min-width: 732px)').matches) {
      this.deviceGroup.next(DeviceGroups.bigPhoneLandscape);
      return;
    }
    if (window.matchMedia('(min-width : 500px)').matches) {
      this.deviceGroup.next(DeviceGroups.phonesLandscape);
      return;
    }
    this.deviceGroup.next(DeviceGroups.phonesPortrait);
  }
}
