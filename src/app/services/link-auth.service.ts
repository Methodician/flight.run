import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { v4 } from 'uuid';

@Injectable()

export class LinkAuthService {

  constructor() { }

  sendSignInLink(email, postSlug) {
    const tempKey = v4();
    let actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      // url: 'https://www.example.com/finishSignUp?cartId=1234'
      url: `http://localhost:4200/blog/post/${postSlug}?verifyLink=${tempKey}`,
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      }
    };
    const result = firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function() {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(function(error) {
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
      const email = window.localStorage.getItem('emailForSignIn');
      console.log(email);
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser

        })
        .catch(function(error) {
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
      return email;
    }
    return 'Unverified';

  }

}
