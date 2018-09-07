import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  user;
  commentList;
  commentKeys;
  @Input() postSlug;

  constructor(private commentService: CommentService, private authService: AuthService) { }

  ngOnInit() {
    this.getCommentList();
    this.getUser();
  }

  async getCommentList() {
    const result = await this.commentService.getCommentsByParentId(this.postSlug, "comments");
    if(result){
      this.commentList = result;
      this.commentKeys = Object.keys(this.commentList);
    }

  }

  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
      }
    });
  }
}
