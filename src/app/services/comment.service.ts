import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CommentService {

  constructor() { }

  // getCommentsRef(postId) {
  //   const ref = firebase.database().ref(`/blog/comments/${postId}`);
  //   return ref;
  // }

  getCommentsRef(commentType: commentTypes, parentId: string){
    const ref = firebase.database().ref(`blog/${commentType}/${parentId}`);
    return ref
  }

  // getResponsesRef(commentId) {
  //   const ref = firebase.database().ref(`/blog/responses/${commentId}`);
  //   return ref;
  // }

  getUserNamesListRef() {
    const ref = firebase.database().ref(`/blog/userNames`);
    return ref;
  }

  getUserRef(userId){
    const ref = firebase.database().ref(`/blog/users/${userId}`);
    return ref;
  }

  // User Data Functions
  createNewUser(userId, userEmail) {
    this.getUserRef(userId).set({email: userEmail, name: 'New User'});
    this.updateUserNamesList(userId, 'New User');
  }

  updateUser(userId, user) {
    this.getUserRef(userId).set(user);
  }

  updateUserNamesList(userId, name) {
    firebase.database().ref(`/blog/userNames/${userId}`).set(name);
  }

  async getUser(userId) {
    const result = await this.getUserRef(userId).once('value');
    return result.val();
  }

  // Commenting Functions
  addComment(packet, user, userId, postSlug) {
    const commentType = (packet.commentMeta.isRootComment) ? 'comments' : 'responses';
    const newCommentKey = firebase.database().ref(`blog/${commentType}`).push().key;
    packet.comment.timeStamp = firebase.database.ServerValue.TIMESTAMP;
    if (!user.posts) {
      user.posts = {};
    }
    user.posts[postSlug] = true;
    if (!user[commentType]) {
      user[commentType] = {};
    }
    user[commentType][newCommentKey] = true;
    if (user.name !== packet.commentMeta.authorName) {
      user.name = packet.commentMeta.authorName;
      this.updateUserNamesList(userId, user.name);
    }
    this.updateUser(userId, user);
    firebase.database().ref(`blog/${commentType}/${packet.commentMeta.parentId}/${newCommentKey}`).set(packet.comment);
  }

  editComment(packet) {
    const commentType = (packet.commentMeta.isRootComment) ? 'comments' : 'responses';
    packet.comment.edited = true;
    firebase.database().ref(`blog/${commentType}/${packet.commentMeta.parentId}/${packet.commentMeta.editKey}`).set(packet.comment);
  }

  async deleteComment(packet) {
    const commentType = (packet.commentMeta.isRootComment) ? 'comments' : 'responses';
    await this.archiveCommentBody(packet.comment.body, commentType, packet.commentMeta.commentKey, packet.commentMeta.parentId);
    packet.comment.body = "The user who wrote this comment has removed it.";
    packet.comment.deleted = firebase.database.ServerValue.TIMESTAMP;
    firebase.database().ref(`blog/${commentType}/${packet.commentMeta.parentId}/${packet.commentMeta.commentKey}`).set(packet.comment);
  }

  // Helper Function for deleteComment()
  async archiveCommentBody(body, commentType, key, parentId) {
    await firebase.database().ref(`blog/${commentType}-body-archive/${parentId}/${key}`).set(body);
  }

  // For Potential Future Use
  // async getCommentsByUser(userId, type) {
  //   const user = await this.getUser(userId);
  //   const comments = {};
  //   let parentIds;
  //   if(type === "comments") {
  //     parentIds = this.getTrueKeys(user.posts);
  //   }else {
  //     parentIds = this.getTrueKeys(user.responses);
  //   }
  //   const commentKeys = this.getTrueKeys(user.comments);
  //   parentIds.forEach((parentId) => {
  //     commentKeys.forEach(async (key) => {
  //       let result = await firebase.database().ref(`blog/${type}/${parentId}/${key}`).once('value');
  //       let comment = result.val();
  //       if(comment){
  //         comments[key] = comment;
  //       }
  //     });
  //   });
  //   return comments;
  // }

  // Helper Function for getCommentsByUser()
  // getTrueKeys(set) {
  //   const allKeys = Object.keys(set);
  //   let trueKeys = [];
  //   allKeys.forEach((key) => {
  //     if(set[key]){
  //       trueKeys.push(key);
  //     }
  //   });
  //   return trueKeys;
  // }

}

export enum commentTypes {
  comments = 'comments',
  responses = 'responses'
}