import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

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

  async getCommentsByPost(postSlug) {
    const result = await admin.database().ref(`/blog/comments/${postSlug}`).once('value');
    const comments = result.val();
    return comments;
  }

  async getCommentsByUser(userEmail) {
    const user = await this.findUser(userEmail);
    const comments = {};
    const postSlugs = getKeys(user.posts);
    const commentKeys = getKeys(user.comments);
    for(slug of postSlugs) {
      for(key of commentKeys){
        let result = await firebase.database().ref(`blog/comments/${slug}/${key}`).once('value');
        let comment = result.val();
        if(comment){
          comments[key] = comment;
        }
      }

    }
    return comments;
  }

  getKeys(set) {
    let keys = [];
    for(key of set){
      if(set[key]){
        keys.push(key);
      }
    }
  }


}
