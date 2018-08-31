import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() postSlug;
  askEmail: boolean = false;
  showForm: boolean = false;
  user= {
        domain: '',
        name: '',
        posts: [],
        comments: []
      };
  userEmail;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  toggleEmail() {
    this.askEmail = !this.askEmail;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addComment(commentBody) {
    if(this.user.posts.indexOf(this.postSlug) === -1){
      this.user.posts.push(this.postSlug);
    }
    let comment = {
      user: this.userEmail,
      body: commentBody,
      post: this.postSlug
    }
    // this.commentService.addComment();
    this.toggleForm();
  }

  async findUser(userEmail) {
    const emailPieces = userEmail.split(".");
    console.log(emailPieces);
    this.userEmail = emailPieces[0];
    console.log(this.userEmail);
    this.user.domain = emailPieces[1];
    console.log(this.user);
    const tempUser = await this.commentService.findUser(this.userEmail);
    console.log(tempUser);
    // if(tempUser){
    //   this.user = tempUser;
    // }
    console.log(this.user);
    this.toggleForm();
    this.toggleEmail();
  }

}
