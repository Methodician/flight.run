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
  @Input() key;
  @Input() parentId;
  @Input() comment;
  responseList;
  responseKeys;
  replyMode: boolean = false;
  editMode: boolean = false;
  showReplies: boolean = false;
  authorName: string = 'Author';
  @Output() saveComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();
  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.authorRef();
    this.responseListRef();
  }

  authorRef() {
    this.commentService.userRef(this.comment.user).on('value', (snapshot) => {
      if(snapshot){
        this.authorName = snapshot.val().name;
      }
    });
  }

  responseListRef() {
    this.commentService.commentsByParentIdRef(this.key, "responses").on('value', (snapshot) => {
      const comments = snapshot.val();
      if (comments) {
        this.responseKeys = Object.keys(comments);
        this.responseList = comments;
      }
    });
  }

  // Comment Actions
  onSaveComment(target) {
    this.saveComment.emit(target);
  }

  onDeleteComment(target = undefined) {
    let output = target;
    if (output === undefined) {
      output = {
        comment: this.comment,
        commentMeta: {
          commentKey: this.key,
          parentId: this.parentId,
          isRootComment: this.isRootComment
        }
      };
    }
    this.deleteComment.emit(output);
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

  toggleShowReplies() {
    this.showReplies = !this.showReplies;
  }
}
