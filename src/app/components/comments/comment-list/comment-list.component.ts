import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CommentService, commentTypes } from '@services/comment.service';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() postSlug;
  user = null;
  userId = null;
  commentKeys;
  commentList;
  authorList = {};
  showLogin: boolean = false;
  signInMessage: boolean = false;
  newCommentForm: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.watchComments(this.postSlug);
    this.watchUserNamesList();
    this.checkSignIn();
    this.watchBlogUser();
  }

  watchComments(postId) {
    this.commentService.getCommentsRef(commentTypes.comments, postId).on('value', snapshot => {
      const comments = snapshot.val();
      if (comments) {
        this.commentList = comments;
        this.commentKeys = Object.keys(this.commentList);
      }
    });
  }

  watchUserNamesList() {
    this.commentService.getUserNamesListRef().on('value', snapshot => {
      this.authorList = snapshot.val();
    });
  }

  // Authentication
  async checkSignIn() {
    const user = await this.authService.confirmSignIn();
    // Returned user === [userId, userEmail]
    if (user && !this.authorList[user[0]]) {
      this.commentService.createNewUser(user[0], user[1]);
    }
    this.router.navigate(['blog/post', this.postSlug]);
  }

  watchBlogUser() {
    this.authService.blogUser$.subscribe(user => {
      this.user = user ? user : null;
      this.userId = user ? this.authService.userId : null;
    });
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
