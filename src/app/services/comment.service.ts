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
  async detectNewUser(userId, userEmail) {
    const existingUser = await this.findUserOnce(userId);
    if (!existingUser) {
      this.createNewUser(userId, userEmail);
    }
  }

  createNewUser(userId, userEmail) {
    firebase.database().ref(`/blog/users/${userId}`).set({email: userEmail, name: 'New User'});
  }

  updateUser(userId, user) {
    firebase.database().ref(`/blog/users/${userId}`).set(user);
  }

  async findUserOnce(userId) {
    const user = await firebase.database().ref(`/blog/users/${userId}`).once('value');
    return user.val();
  }

  findUser(userId) {
    const result = firebase.database().ref(`/blog/users/${userId}`);
    return result;
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
    if (commentType === 'comments') {
      if (!user.comments) {
        user.comments = {};
      }
      user.comments[newCommentKey] = true;
    } else if (commentType === 'responses') {
      if (!user.responses) {
        user.responses = {};
      }
      user.responses[newCommentKey] = true;
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
  //   const user = await this.findUserOnce(userId);
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
