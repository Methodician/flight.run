import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CommentService {

  constructor() { }

  getCommentsByPost(postId) {
    const result = firebase.database().ref(`/blog/comments/${postId}`);
    return result;
  }

  getResponsesByComment(commentId) {
    const result = firebase.database().ref(`/blog/responses/${commentId}`);
    return result;
  }

  // User Data Functions
  async findExistingUser(user) {
    if (user) {
      const userId = user[0];
      const userEmail = user[1];
      const existingUser = await this.findUserOnce(userId);
      if (!existingUser) {
        const newUser = {
          email: userEmail,
          name: ''
        };
        this.setUser(newUser, userId);
      }
    }
  }

  async setUser(user, userId){
    await firebase.database().ref(`/blog/users/${userId}`).set(user);
  }

  findUser(userId) {
    const result = firebase.database().ref(`/blog/users/${userId}`);
    return result;
  }

  async findUserOnce(userId) {
    const user = await firebase.database().ref(`/blog/users/${userId}`).once('value');
      return user.val();
  }

  // Individual Comment Functions
  async addComment(comment,parentId, user, userId, type) {
    var newCommentKey = firebase.database().ref().child('blog/comments').push().key;
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
    comment.timeStamp = firebase.database.ServerValue.TIMESTAMP;
    await firebase.database().ref(`blog/${type}/${parentId}/${newCommentKey}`).set(comment);
    return;
  }

  async editComment(comment, key, parentId, type) {
    comment.edited = true;
    await firebase.database().ref(`blog/${type}/${parentId}/${key}`).set(comment);
    return;
  }

  async deleteComment(comment, key, parentId, type){
    await this.saveOldBody(comment.body, type, key, parentId);
    comment.body = "The user who wrote this comment has removed it.";
    comment.deleted = firebase.database.ServerValue.TIMESTAMP;
    await firebase.database().ref(`blog/${type}/${parentId}/${key}`).set(comment);
    return;
  }

  // Helper Function for deleteComment()
  async saveOldBody(body, type, key, parentId){
    await firebase.database().ref(`blog/${type}-body-archive/${parentId}/${key}`).set(body);
    return;
  }

  // For Future Use
  async getCommentsByUser(userId, type) {
    const user = await this.findUserOnce(userId);
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

  // Helper Function for getCommentsByUser
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
