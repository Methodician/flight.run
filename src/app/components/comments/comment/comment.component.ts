import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';

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
  user;
  author;
  date;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.findAuthor();
    this.getDate();
    // this.getUser();
    // if(type === "comments"){
    //   this.getResponseList()
    // }
  }

  async findAuthor(){
    const user = await this.commentService.findUser(this.comment.user);
    this.author = user;
  }

  getDate() {
    const tempDate = new Date(this.comment.timeStamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.date= tempDate.toLocaleDateString("en-US", options);

  }

  // async getResponseList() {
  //   const result = await this.commentService.getCommentsByParentId(this.parentId);
  //   this.responseKeys = Object.keys(result);
  //   this.responseList = result;
  // }

  // getUser() {
  //   this.authService.blogUser$.subscribe((user) =>{
  //     if(user){
  //       this.user = user;
  //     }
  //   });
  // }
}
