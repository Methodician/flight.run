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
    if (user) {
      // user === [userId, userEmail]
      this.commentService.detectNewUser(user[0], user[1]);
    }
    this.router.navigate(['blog/post', this.postSlug]);
  }

  signInWithEmail(email) {
    this.authService.sendSignInLink(email, this.postSlug);
  }

  signOut() {
    this.authService.signBlogOut();
  }

  // Comment Actions
  saveComment(packet) {
    if (!packet.commentMeta.isEdit) {
      this.commentService.addComment(packet, this.user, this.userId, this.postSlug);
    } else {
      this.commentService.editComment(packet);
    }
  }

  deleteComment(packet) {
    if (confirm('Are you sure you want to remove this comment?')) {
      this.commentService.deleteComment(packet);
    }
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
