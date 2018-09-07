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
  responseList;
  responseKeys;
  user;
  author;
  isAuthor = false;
  date;

  constructor(private commentService: CommentService, private authService: AuthService) { }

  ngOnInit() {
    this.findAuthor();
    this.getDate();
    this.getUser();
    if(this.type === "comments"){
      this.getResponseList()
    }
  }

  async findAuthor(){
    const user = await this.commentService.findUser(this.comment.user);
    this.author = user;
    if(this.author.name === this.user.name){
      this.isAuthor = true;
    }
  }

  getDate() {
    const tempDate = new Date(this.comment.timeStamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.date= tempDate.toLocaleDateString("en-US", options);

  }

  async getResponseList() {
    const result = await this.commentService.getCommentsByParentId(this.key, "responses");
    this.responseKeys = Object.keys(result);
    this.responseList = result;
  }

  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
      }
    });
  }
}
