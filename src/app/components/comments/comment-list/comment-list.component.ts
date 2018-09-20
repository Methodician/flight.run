import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.subscribeToUser();
    this.route.queryParams.subscribe((params: Params) => {
      if(params['apiKey']){
        this.verifyApiKey();
      }
    });
    this.getCommentsByPost(this.postSlug);
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

  getCommentsByPost(postId) {
    this.commentService.getCommentsByPost(postId).on('value', (snapshot) => {
       const comments = snapshot.val();
       if(comments){
        this.commentList = comments;
        this.commentKeys = Object.keys(this.commentList);
       }
    });
  }

  // Authentication
  signInWithEmail(email) {
    this.authService.sendSignInLink(email, this.postSlug);
  }

  signOut() {
    this.authService.signBlogOut();
  }

  async verifyApiKey() {
    const userInfo = await this.authService.confirmSignIn();
    //if user is verified adds new user if the user is not in firebase already
    if (userInfo) {
      const user = await this.commentService.findUserOnce(userInfo[0]);
      if (!user) {
        const newUser = {
          email: userInfo[1],
          name: ''
        };
        this.commentService.setUser(newUser, userInfo[0]);
      }
    }
    this.router.navigate(['blog/post', this.postSlug]);
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
