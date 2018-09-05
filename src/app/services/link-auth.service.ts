import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()

export class LinkAuthService {

  constructor() { }

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
        window.localStorage.setItem('verifiedEmail', email);
        return email;
      }
    }
    return 'Unverified';

  }

}
