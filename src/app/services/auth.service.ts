import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { ProfileUser } from '../shared/models/profileUser.model';


@Injectable()
export class AuthService {
  user: Observable<ProfileUser | null>;
  loggedIn: boolean;
  db;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,

  ) {
    // CONNECTION TO DB
    this.db = firebase.firestore();

    // CHECK LOGGED IN STATUS
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.loggedIn = true;
          return this.afs.doc<ProfileUser>(`users/${user.uid}`).valueChanges();
        } else {
          this.loggedIn = false;
          return of(null);
        }
      })
    );
  }


  //// Email/Password Auth ////

  emailSignUp(email, password, displayName, img) {
    return this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      const userData: ProfileUser = {email: email, userName: displayName, imgURL: img, uid: credential.user.uid, securityLvl: 10};
        this.notify.update('Welcome to Firestarter!!!', 'success');
        this.router.navigate(['profile']);
        return this.updateNewUserData(userData); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.handleError(error));

  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  update(userData: ProfileUser) {
    this.updateUserData(userData);
    console.log('update click' + userData.securityLvl);

  }

  signOut() {
    console.log(this.loggedIn);
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // DB CALL EXAMPLE //
   getSecrets() {
    return this.db.collection('secrets').doc('mySecrets');
  }


  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(userData: ProfileUser) {
    const userRef: AngularFirestoreDocument<ProfileUser> = this.afs.doc(
      `users/${userData.uid}`
    );

      const data: ProfileUser = {
      uid: userData.uid,
      email: userData.email,
      userName: userData.userName,
      imgURL: userData.imgURL,
      securityLvl: userData.securityLvl
    };
    return userRef.set(data);
  }

   // Sets user data to firestore after succesful login
   private updateNewUserData(userData: ProfileUser) {
    const userRef: AngularFirestoreDocument<ProfileUser> = this.afs.doc(
      `users/${userData.uid}`
    );
    const data: ProfileUser = {
      uid: userData.uid,
      email: userData.email,
      userName: userData.userName,
      imgURL: userData.imgURL || '../../assets/anonUser.png',
      securityLvl: 10
    };
    return userRef.set(data);
  }
}
