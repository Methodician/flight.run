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
  user;
  userId;
  askEmail: boolean = false;
  showForm: boolean = false;
  showUnverified: boolean = false;
  sentLink: boolean = false;

  constructor(private commentService: CommentService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['apiKey']){
        this.verifyApiKey();
      }
    });

    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        this.askEmail= false;
        this.showForm= false;
        this.showUnverified= false;
        this.sentLink= false;
      }
    });
    this.getUser();
  }

  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
        this.userId = this.authService.userId;
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
    if(!this.user.posts){
      this.user.posts = [];
    }
    this.user.posts[this.postSlug]= true;
    let comment = {
      user: this.userId,
      body: commentBody,
      timeStamp: null
    }
    this.commentService.addComment(comment, this.postSlug, this.user, this.userId);
    this.toggleForm();
  }

  verifyEmail(inputEmail) {
    const lowerEmail = inputEmail.toLowerCase();
    this.authService.sendSignInLink(lowerEmail, this.postSlug);
    this.toggleSentLink();
    this.toggleEmail();
  }

  async findUser() {
    const tempUser = await this.commentService.findUser(this.userId);
    if (tempUser) {
      this.user = tempUser;
    }
    this.toggleForm();
  }

  async verifyApiKey() {
    const userInfo = await this.authService.confirmSignIn();
    if (userInfo !== 'Unverified') {
      const newUser = {
        email: userInfo[1],
        name: '',
        posts: {},
        comments: {}
      };
      this.commentService.setUser(newUser, userInfo[0]);
      this.userId = userInfo[0];
      this.findUser();

    } else {
      this.showUnverified = true;
      this.toggleEmail();
    }
  }

  checkLogin(){
    if(this.userId){
      this.toggleForm();
    }else{
      this.toggleEmail();
    }
  }

  signOut(){
    this.authService.signBlogOut();
    this.user = null;
    this.userId = null;
  }

}
