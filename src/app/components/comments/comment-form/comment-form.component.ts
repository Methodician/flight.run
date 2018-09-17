import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fly-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() userId;
  @Input() username;
  @Input() parentId;
  @Input() isRootComment: boolean;
  @Input() isEdit: boolean;
  @Input() commentToEditKey;
  @Input() commentToEdit;
  commentForm: FormGroup;
  @Output() saveComment = new EventEmitter();
  @Output() cancelComment = new EventEmitter();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createDefaultForm();
    this.checkEditMode();
  }

  createDefaultForm() {
    this.commentForm = this.formBuilder.group({
      authorName: [this.username, Validators.required],
      parentId: [this.parentId, Validators.required],
      isRootComment: [this.isRootComment, Validators.required],
      isEdit: [this.isEdit],
      editKey: [this.commentToEditKey],
      comment: this.formBuilder.group({
        user: [this.userId, Validators.required],
        body: ['', Validators.required],
        timeStamp: [null],
        edited: [false],
        deleted: [false]
      })
    });
  }

  checkEditMode() {
    if (this.isEdit) {
      this.commentForm.patchValue({comment: this.commentToEdit});
    }
  }

  onSaveComment() {
    this.saveComment.emit(this.commentForm.value);
  }

  onCancelComment() {
    this.cancelComment.emit();
  }

}
