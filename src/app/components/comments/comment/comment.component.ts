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
    this.getUser();
    this.getDate();
    this.getResponseList();

  }

//Finds the comment author
  findAuthor(){
    this.commentService.findUser(this.comment.user).on('value', (snapshot) => {
      const author = snapshot.val();
      if(author){
        this.author = author;
        this.checkIsAuthor();
      }
    });
  }
//checks if user = author
  checkIsAuthor() {
    if(this.author && this.user && this.author.email === this.user.email){
      this.isAuthor = true;
    }
  }
//Formats comment timestamp into date
  getDate() {
    const tempDate = new Date(this.comment.timeStamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.date = tempDate.toLocaleDateString("en-US", options);
  }
//Retrieves any responses to the comment
  getResponseList() {
    this.commentService.getCommentsByParentId(this.key, "responses").on('value', (snapshot) => {
      const comments = snapshot.val();
      if(comments){
        this.responseKeys = Object.keys(comments);
        this.responseList = comments;
      }
    });
  }
//Checks for logged in user
  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
        this.checkIsAuthor();
      }else {
        this.isAuthor = false;
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
