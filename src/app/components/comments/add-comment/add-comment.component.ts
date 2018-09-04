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
        name: '',
        posts: {},
        comments: {}
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
    this.user.posts[this.postSlug] = true;
    let comment = {
      user: this.userEmail,
      body: commentBody,
      timeStamp: null
    }
    this.commentService.addComment(comment, this.postSlug, this.user, this.userEmail);
    this.toggleForm();
  }

  async findUser(inputEmail) {
    const reformatEmail= inputEmail.replace(".", "-d0t-");
    console.log(reformatEmail);
    this.userEmail = reformatEmail;
    console.log(this.userEmail);
    const tempUser = await this.commentService.findUser(this.userEmail);
    if(tempUser){
      this.user = tempUser;
    }
    this.toggleForm();
    this.toggleEmail();
  }

}
