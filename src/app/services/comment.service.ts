import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CommentService {

  constructor() { }

//finds a user using the userId
  async findUser(userId) {
    const result = await firebase.database().ref(`/blog/users/${userId}`).once('value');
    const user = result.val();
    return user;
  }
//adds comment to firebase
  async addComment(comment,parentId, user, userId, type) {
    var newCommentKey = firebase.database().ref().child('blog/comments').push().key;
    await firebase.database().ref(`blog/${type}/${parentId}/${newCommentKey}`).set(comment);
    await firebase.database().ref(`blog/${type}/${parentId}/${newCommentKey}/timeStamp`).set(firebase.database.ServerValue.TIMESTAMP);
    //adds new comment id to user's comments or responses section based on comment type
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
//sets a user in firebase
  async setUser(user, userId){
    await firebase.database().ref(`/blog/users/${userId}`).set(user);
  }
//finds all comments based in the parentId of the comment
  async getCommentsByParentId(parentId, type) {
    //function should be able to listen for changes to comments but is buggy
    // const result = await firebase.database().ref(`/blog/${type}/${parentId}`);
    // result.on('value', (snapshot) => {
    //   const comments = snapshot.val();
    //   return comments;
    // });

    //using this temporarily until we can get function to listen
    const result = await firebase.database().ref(`/blog/${type}/${parentId}`).once('value');
    const comments = result.val();
    return comments;
  }
//finds comments by user-- not actually in use yet, but written just in case
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
//used in above function to find keys for which the value is true;
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
//changes body of comment to set message and sets delete value to timestamp instead of false;
  async deleteComment(comment, key, parentId, type){
    comment.body = "The user who wrote this comment has deleted it.";
    comment.deleted = firebase.database.ServerValue.TIMESTAMP;
    await firebase.database().ref(`blog/${type}/${parentId}/${key}`).set(comment);
  }
//sets comment edited value to true and updates comment
  async editComment(comment, key, parentId, type) {
    comment.edited = true;
    await firebase.database().ref(`blog/${type}/${parentId}/${key}`).set(comment);
  }

}
