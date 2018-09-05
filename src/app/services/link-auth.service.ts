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
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function () {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function (error) {
        console.log(error);
        // Some error occurred, you can inspect the code: error.code
      });
  }

  confirmSignIn() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      console.log(email);
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function (result) {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser

        })
        .catch(function (error) {
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
      return email;
    }
    return 'Unverified';

  }

}
