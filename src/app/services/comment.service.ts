import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CommentService {

  constructor() { }

  async findUser(userId) {
    const result = await firebase.database().ref(`/blog/users/${userId}`).once('value');
    const user = result.val();
    return user;
  }

  async addComment(comment,postSlug, user, userId) {
    var newCommentKey = firebase.database().ref().child('blog/comments').push().key;
    await firebase.database().ref(`blog/comments/${postSlug}/${newCommentKey}`).set(comment);
    await firebase.database().ref(`blog/comments/${postSlug}/${newCommentKey}/timeStamp`).set(firebase.database.ServerValue.TIMESTAMP);
    if(!user.comments){
      user.comments = [];
      console.log(user);
    }
    user.comments[newCommentKey] = true;
    this.setUser(user, userId);
  }

  async setUser(user, userId){
    await firebase.database().ref(`/blog/users/${userId}`).set(user);
  }

  // async getCommentsByPost(postSlug) {
  //   const result = await admin.database().ref(`/blog/comments/${postSlug}`);
  // }


}
