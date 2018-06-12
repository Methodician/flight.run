import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/observable';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('to string :' + next.toString + '   params : ' + next.params + '   children :' + next.children.entries.toString);
    console.log('here');
    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.notify.update('You must be logged in!', 'error');
          this.router.navigate(['/login']);
        // } else { // remove else ad associated.
          // this.auth.user.subscribe(info =>
          // console.log('current user email ' + info.email + 'uid' + info.uid));
        }
      })
    );
  }
}
