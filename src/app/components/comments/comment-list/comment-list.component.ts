import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() postSlug;
  user = null;
  userId = null;
  commentList;
  commentKeys;
  showLogin: boolean = false;
  signInMessage: boolean = false;
  newCommentForm: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.getCommentsByPost(this.postSlug);
    this.subscribeToUser();
    this.checkSignIn();
  }

  getCommentsByPost(postId) {
    this.commentService.getCommentsByPost(postId).on('value', (snapshot) => {
      const comments = snapshot.val();
      if(comments){
        this.commentList = comments;
        this.commentKeys = Object.keys(this.commentList);
      }
    });
  }

  subscribeToUser() {
    this.authService.blogUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.userId = this.authService.userId;
      } else {
        this.user = null;
        this.userId = null;
      }
    });
  }

  // Authentication
  async checkSignIn() {
    const user = await this.authService.confirmSignIn();
    this.commentService.findExistingUser(user);
    this.router.navigate(['blog/post', this.postSlug]);
  }

  signInWithEmail(email) {
    this.authService.sendSignInLink(email, this.postSlug);
  }

  signOut() {
    this.authService.signBlogOut();
  }

  // Comment Actions
  saveComment(target) {
    const commentType = (target.commentMeta.isRootComment) ? 'comments' : 'responses';
    return (!target.commentMeta.isEdit) ? this.addComment(target, commentType) : this.editComment(target, commentType);
  }

  deleteComment(target) {
    if (confirm('Are you sure you want to remove this comment?')) {
      const commentType = (target.commentMeta.isRootComment) ? 'comments' : 'responses';
      this.commentService.deleteComment(target.comment, target.commentMeta.commentKey, target.commentMeta.parentId, commentType);
    }
  }

  // Save Comment Types
  addComment(target, commentType) {
    if (!this.user.posts) {
      this.user.posts = [];
    }
    this.user.posts[this.postSlug] = true;
    this.user.name = target.commentMeta.authorName;
    this.commentService.addComment(target.comment, target.commentMeta.parentId, this.user, this.userId, commentType);
  }

  editComment(target, commentType) {
    this.commentService.editComment(target.comment, target.commentMeta.editKey, target.commentMeta.parentId, commentType);
  }

  // UI Controls
  activateLogin() {
    this.showLogin = true;
  }

  toggleSignInMessage() {
    this.signInMessage = !this.signInMessage;
  }

  toggleNewComment() {
    this.newCommentForm = !this.newCommentForm;
  }

}
