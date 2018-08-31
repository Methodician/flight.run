import { Injectable } from '@angular/core';
import * as admin from 'firebase-admin';

@Injectable()
export class CommentService {
  admin.initializeApp();
  constructor() { }

  async addComment(commentData, userInfo, postSlug) {
    await admin.database().ref(`/blog/users/${userInfo.email}/name`).set(userInfo.name);
    if(!userInfo.posts.contains(postSlug)){
      await admin.database().ref(`/blog/users/${userInfo.email}/posts`).push(postSlug);
    }

    await admin.database().ref(`/blog/users/${userInfo.email}/comments`).push(commentKey);
    await admin.database().ref(`/blog/comments/${postSlug}/${commentKey}`).set(commentData);
  }

}
