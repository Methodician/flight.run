import { Injectable } from '@angular/core';
// import { AngularFireModule } from 'angularfire2';
// import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
// import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { environment } from '@environments/environment';
//
firebase.initializeApp(environment.firebaseConfig);


@Injectable()
export class CommentService {

  constructor() { }

  async findUser(userEmail) {
    const result = await firebase.database().ref(`/blog/users/${userEmail}`).once('value');
    const user = result.val();
    return user;
  }

  async addComment(comment,postSlug, user, userEmail) {
    var newCommentKey = firebase.database().ref().child('blog/comments').push().key;
    await firebase.database().ref(`blog/comments/${postSlug}/${newCommentKey}`).set(comment);
    await firebase.database().ref(`blog/comments/${postSlug}/${newCommentKey}/timeStamp`).set(firebase.database.ServerValue.TIMESTAMP);
    user.comments[newCommentKey] = true;
    await firebase.database().ref(`/blog/users/${userEmail}`).set(user);
  }

  // async getCommentsByPost(postSlug) {
  //   const result = await admin.database().ref(`/blog/comments/${postSlug}`);
  // }


}
