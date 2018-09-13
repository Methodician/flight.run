import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/observable';
import { map, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private notify: NotifyService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      tap(auth => console.log('authState', auth)),
      map(authState => !!authState),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.notify.update('You must be logged in!', 'error');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
