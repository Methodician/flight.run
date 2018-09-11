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
  isAuthor = false;
  edit = false;
  date;

  constructor(private commentService: CommentService, private authService: AuthService) { }

  ngOnInit() {
    this.findAuthor();
    this.getDate();
    this.getResponseList()


  }

//Finds the comment author
  async findAuthor(){
    const tempAuthor = await this.commentService.findUser(this.comment.user);
    this.author = tempAuthor;
    this.getUser();
  }
//checks if user = author
  checkIsAuthor() {
    if(this.author.email === this.user.email){
      this.isAuthor = true;
    }
  }
//Formats comment timestamp into date
  getDate() {
    const tempDate = new Date(this.comment.timeStamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.date= tempDate.toLocaleDateString("en-US", options);

  }
//Retrieves any responses to the comment
  async getResponseList() {
    const result = await this.commentService.getCommentsByParentId(this.key, "responses");
    if(result){
      this.responseKeys = Object.keys(result);
      this.responseList = result;
    }
  }
//Checks for logged in user
  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
        this.checkIsAuthor();
      }else {
        this.isAuthor=false;
        this.user = null;
      }
    });
  }
//Delete Comment
  deleteComment() {
    this.commentService.deleteComment(this.comment, this.key, this.parentId, this.type);
  }
//Toggles edit form on/off
  toggleEdit() {
    this.edit = !this.edit;
  }
}
