import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  commentList;
  commentKeys;
  @Input() postSlug;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.getCommentList();
  }

  async getCommentList() {
    const result = await this.commentService.getCommentsByPost(this.postSlug);
    this.commentKeys = Object.keys(result);
    this.commentList = result;
    // keys.forEach((key) => {
    //   this.commentList.push(result[key]);
    // });
  }

}
