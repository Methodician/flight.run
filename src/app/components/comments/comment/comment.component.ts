import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'fly-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() userId;
  @Input() username;
  @Input() isRootComment: boolean;
  @Input() comment;
  @Input() key;
  @Input() type;
  @Input() parentId;
  responseList;
  responseKeys;
  replyMode: boolean = false;
  editMode: boolean = false;
  authorName: string = 'Author';
  @Output() saveComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();
  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.findAuthor();
    this.getResponseList();
  }

  findAuthor() {
    this.commentService.findUser(this.comment.user).on('value', (snapshot) => {
      this.authorName = snapshot.val().name;
    });
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

  // Comment Actions
  onSaveComment(formValue) {
    this.saveComment.emit(formValue);
  }

  startDeleteComment() {
    const target = {
      commentKey: this.key,
      comment: this.comment,
      parentId: this.parentId,
      isRootComment: this.isRootComment
    };
    this.onDeleteComment(target);
  }

  onDeleteComment(target) {
    this.deleteComment.emit(target);
  }

  // Authorization
  isAuthor() {
    return (this.comment.user === this.userId) ? true : false;
  }

  // UI Controls
  toggleReplyMode() {
    this.replyMode = !this.replyMode;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
