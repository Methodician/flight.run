import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { LinkAuthService } from '@services/link-auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fly-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() postSlug;
  apiKey = null;
  askEmail: boolean = false;
  showForm: boolean = false;
  showUnverified: boolean = false;
  sentLink: boolean = false;
  user = {
    name: '',
    posts: {},
    comments: {}
  };
  userEmail;

  constructor(private commentService: CommentService, private linkAuthService: LinkAuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.apiKey = params['apiKey'];
    });
    this.verifyApiKey();

  }

  toggleEmail() {
    this.askEmail = !this.askEmail;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleSentLink() {
    this.sentLink = !this.sentLink;
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

  verifyEmail(inputEmail) {
    this.linkAuthService.sendSignInLink(inputEmail, this.postSlug);
    this.userEmail = inputEmail;
    this.toggleSentLink();
    this.toggleEmail();
  }

  async findUser(inputEmail) {
    const reformatEmail = inputEmail.replace(".", "-d0t-");
    this.userEmail = reformatEmail;
    const tempUser = await this.commentService.findUser(this.userEmail);
    if (tempUser) {
      this.user = tempUser;
    }
    this.toggleForm();
  }

  verifyApiKey() {
    if (this.apiKey) {
      const elmnt = document.getElementById("comments");
      elmnt.scrollIntoView();
      const email = this.linkAuthService.confirmSignIn();
      if (email !== 'Unverified') {
        this.findUser(email);
      } else {
        this.showUnverified = true;
        this.askEmail = true;
      }

    }
  }

}
