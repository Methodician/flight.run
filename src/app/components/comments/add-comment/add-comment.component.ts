import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { AuthService } from '@services/auth.service';
import { Router, Event, NavigationStart, ActivatedRoute, Params } from '@angular/router';

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

  constructor(private commentService: CommentService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.apiKey = params['apiKey'];
    });
    this.verifyApiKey();
    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        this.askEmail= false;
        this.showForm= false;
        this.showUnverified= false;
        this.sentLink= false;
      }
    });

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
    const lowerEmail = inputEmail.toLowerCase();
    const verifiedEmail = window.localStorage.getItem('verifiedEmail');
    if(lowerEmail === verifiedEmail) {
      this.findUser(lowerEmail);
    } else {
      this.authService.sendSignInLink(lowerEmail, this.postSlug);
      this.userEmail = inputEmail;
      this.toggleSentLink();
    }
    this.toggleEmail();
  }

  async findUser(inputEmail) {
    const reformatEmail = inputEmail.replace(/\./g, "-d0t-");
    this.userEmail = reformatEmail;
    const tempUser = await this.commentService.findUser(this.userEmail);
    if (tempUser) {
      this.user = tempUser;
    }
    this.toggleForm();
  }

  async verifyApiKey() {
    if (this.apiKey) {
      const email = await this.authService.confirmSignIn();

      if (email !== 'Unverified') {
        this.findUser(email);
      } else {
        this.showUnverified = true;
        this.toggleEmail();
      }

    }
    const user = await this.authService.checkForVerifiedUser();
    console.log(user);
  }

}
