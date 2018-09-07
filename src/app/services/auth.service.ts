import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { ProfileUser } from '@shared/models/profileUser.model';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AuthService {
  adminUser$: BehaviorSubject<ProfileUser | null>= new BehaviorSubject(null);
  // @kristen: Optional... create a model for "BlogUser" so we can specify the type like for "ProfileUser" above
  // @kristen: please change the way we're storing users in the RTDB: path should now be "blog/users/${userId}"
  // and should contain both their name and their email address as properties along with comments and posts.
  blogUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  loggedIn: boolean;
  db;
  userId;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private rtdb: AngularFireDatabase,
    private router: Router,
    private notify: NotifyService,

  ) {
    // CONNECTION TO DB
    this.db = firebase.firestore();

    this.trackLoggedInStatus();
    // replaced with trackLoggedInStatus below...
    // CHECK LOGGED IN STATUS
    // this.adminUser = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       this.loggedIn = true;
    //       return this.afs.doc<ProfileUser>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       this.loggedIn = false;
    //       return of(null);
    //     }
    //   })
    // );
  }

  trackLoggedInStatus() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.loggedIn = true;
        // CHECK FOR ADMIN USER
        this.afs.doc<ProfileUser>(`users/${auth.uid}`).valueChanges().subscribe(user => {
          this.adminUser$.next(user);
        });
        // CHECK FOR BLOG USER
        this.rtdb.object(`blog/users/${auth.uid}`).valueChanges().subscribe(user => {
          this.blogUser$.next(user);
        });
      } else {
        this.loggedIn = false;
        this.adminUser$.next(null);
        this.blogUser$.next(null);
      }
    });
  }


  //// Email/Password Auth ////
  emailSignUp(email, password, displayName, img) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        const userData: ProfileUser = { email: email, userName: displayName, imgURL: img, uid: credential.uid, securityLvl: 10 };

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
      userName: userData.userName || '',
      imgURL: userData.imgURL || '../../assets/anonUser.png',
    };
    return userRef.update(data);
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

  //Email-link sign in functions
  sendSignInLink(email, postSlug) {
    const actionCodeSettings = {
      url: `http://localhost:4200/blog/post/${postSlug}`,
      handleCodeInApp: true
    };
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  }

  async confirmSignIn() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
        email = email.toLowerCase();
      }
      const result = await firebase.auth().signInWithEmailLink(email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      if(result.user.emailVerified){
        return [result.user.uid, email];
      }
    }
    return 'Unverified';

  }

  async checkForVerifiedUser() {
    var user = await firebase.auth().currentUser;
    return user;
  }

  signBlogOut() {
    firebase.auth().signOut();
  }
}
