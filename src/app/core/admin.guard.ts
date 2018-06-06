import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // return true;
    // state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admin Use Only')
          this.router.navigate(['**']);///create login component and change this route

        }
      })
    );
  }
}
