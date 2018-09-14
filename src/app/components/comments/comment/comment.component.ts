import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'fly-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  @Input() key;
  @Input() type;
  @Input() postSlug;
  @Input() parentId;
  responseList;
  responseKeys;
  user;
  author;
  isAuthor: boolean = false;
  editMode: boolean = false;
  commentMode: boolean = false;
  date;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.findAuthor();
    this.getUser();
    this.getDate();
    this.getResponseList();
  }

  findAuthor() {
    this.commentService.findUser(this.comment.user).on('value', (snapshot) => {
      const author = snapshot.val();
      if (author) {
        this.author = author;
        this.checkIsAuthor();
      }
    });
  }

  checkIsAuthor() {
    if (this.author && this.user && this.author.email === this.user.email) {
      this.isAuthor = true;
    }
  }

  getDate() {
    const tempDate = new Date(this.comment.timeStamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.date = tempDate.toLocaleDateString("en-US", options);
  }

  getResponseList() {
    this.commentService.getCommentsByParentId(this.key, "responses").on('value', (snapshot) => {
      const comments = snapshot.val();
      if (comments) {
        this.responseKeys = Object.keys(comments);
        this.responseList = comments;
      }
    });
  }

  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if (user) {
        this.user = user;
        this.checkIsAuthor();
      } else {
        this.isAuthor = false;
        this.user = null;
      }
    });
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment, this.key, this.parentId, this.type);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleCommentMode() {
    this.commentMode = !this.commentMode;
  }

}
