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

  async addComment(comment,parentId, user, userId, type) {
    var newCommentKey = firebase.database().ref().child('blog/comments').push().key;
    await firebase.database().ref(`blog/${type}/${parentId}/${newCommentKey}`).set(comment);
    await firebase.database().ref(`blog/${type}/${parentId}/${newCommentKey}/timeStamp`).set(firebase.database.ServerValue.TIMESTAMP);
    if(type === "comments") {
      if(!user.comments){
        user.comments = [];
      }
      user.comments[newCommentKey] = true;
    }else {
      if(!user.responses){
        user.responses = [];
      }
      user.responses[newCommentKey] = true;
    }

    this.setUser(user, userId);
  }

  async setUser(user, userId){
    await firebase.database().ref(`/blog/users/${userId}`).set(user);
  }

  async getCommentsByParentId(parentId, type) {
    // const result = await firebase.database().ref(`/blog/${type}/${parentId}`);
    // result.on('value', (snapshot) => {
    //   const comments = snapshot.val();
    //   return comments;
    // });


    const result = await firebase.database().ref(`/blog/${type}/${parentId}`).once('value');
    const comments = result.val();
    return comments;
  }

  async getCommentsByUser(userId, type) {
    const user = await this.findUser(userId);
    const comments = {};
    let parentIds;
    if(type === "comments") {
      parentIds = this.getTrueKeys(user.posts);
    }else {
      parentIds = this.getTrueKeys(user.responses);
    }
    const commentKeys = this.getTrueKeys(user.comments);
    parentIds.forEach((parentId) => {
      commentKeys.forEach(async (key) => {
        let result = await firebase.database().ref(`blog/${type}/${parentId}/${key}`).once('value');
        let comment = result.val();
        if(comment){
          comments[key] = comment;
        }
      });

    });
    return comments;
  }

  getTrueKeys(set) {
    const allKeys = Object.keys(set);
    let trueKeys = [];
    allKeys.forEach((key) => {
      if(set[key]){
        trueKeys.push(key);
      }
    });
    return trueKeys;
  }

}
