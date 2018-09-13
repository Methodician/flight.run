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
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';
import { ProfileUser } from '@shared/models/profileUser.model';

@Injectable()
export class AdminGuard implements CanActivate {
  auth;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      tap(auth => this.auth = auth),
      map(authState => !!authState),
      tap(loggedIn => {
        this.afs.doc<ProfileUser>(`users/${this.auth.uid}`).valueChanges().subscribe(user => {
          if(!user || user.securityLvl !== 10){
            console.log('access denied');
            this.notify.update('You are not authorized to view this page', 'error');
            this.router.navigate(['']);
          }
        });
      })
    );
  }
}
