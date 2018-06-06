import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
      // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // return true;
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.canRead(user) ? true : false),
      tap(canView => {
        if (!canView) {
          console.error('Access denied - Authorized Access Only')
            this.router.navigate(['**']);///create login component and change this route
        }
      })
    );
  }
}
