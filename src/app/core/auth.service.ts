import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
// import { User } from 'firebase';

export interface User {
  uid: string;
  email?: string | null;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log('user true :' + user.uid); // REMOVE
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          console.log('user false'); // REMOVE
          return of(null);
        }
      })
    );
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        this.router.navigate(['login']);
        return this.updateNewUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        this.router.navigate(['/  ']);
        const testData = credential.user;
        const user = {uid: credential.uid, email: credential.email};
        // return this.updateUserData(credential.user);
        return this.updateUserData(user);
      })
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

  signOut() {
    console.log('signout here');
    console.log(this.afAuth.authState);
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user) { // change
    console.log('id at updateUserDate ' + user.uid); // REMOVE
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

      const data: User = {
      uid: user.uid,
      email: user.email
    };
    console.log('data  email' + data.email + ' uid  ' + data.uid);
    return userRef.set(data);
  }

   // Sets user data to firestore after succesful login
   // NOT DOING WHAT ITS SUPPOSED TO. FIRESTORE DOCS NOT SAVING CORRETLY(?)
   //  EXTRA USER INFO DOES NOT SAVE TO DB ???
   private updateNewUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email
    };
    console.log('data email' + data.email + ' uid '  + data.uid);
    return userRef.set(data);
  }
}
