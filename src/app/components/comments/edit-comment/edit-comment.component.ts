import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'fly-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  @Input() comment;
  @Input() key;
  @Input() type;
  @Input() postSlug;
  @Input() parentId;
  @Output() toggleEdit = new EventEmitter();

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }
//updates comment
  editComment() {
    this.commentService.editComment(this.comment, this.key, this.parentId, this.type);
    this.toggleEdit.emit();
  }

}
