import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { AuthService } from '@services/auth.service';
import { Router, Event, NavigationStart, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fly-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() parentId;
  @Input() type;
  @Input() postSlug;
  @Output() getComments = new EventEmitter();
  user;
  userId;
  button;
  askEmail: boolean = false;
  showForm: boolean = false;
  showUnverified: boolean = false;
  sentLink: boolean = false;

  constructor(private commentService: CommentService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //on init checks for logged in user, checks for verification link, and checks navigation
    this.getUser();
    if(this.type === "comments"){
      this.button = "Add Comment";
    } else {
      this.button = "Reply";
    }
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
  }
// Checks for logged in user
  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
        this.userId = this.authService.userId;
      }
    });
  }
// toggles prompt for verification email
  toggleEmail() {
    this.askEmail = !this.askEmail;
  }
//toggles add comment form
  toggleForm() {
    this.showForm = !this.showForm;
  }
//toggles sent link notification
  toggleSentLink() {
    this.sentLink = !this.sentLink;
  }
//adds comment
  addComment(commentBody) {
    if(this.type === "comments"){
      if(!this.user.posts){
        this.user.posts = [];
      }
      this.user.posts[this.parentId]= true;
    }
    let comment = {
      user: this.userId,
      body: commentBody,
      timeStamp: null,
      edited: false,
      deleted: false
    }
    this.commentService.addComment(comment, this.parentId, this.user, this.userId, this.type);
    this.toggleForm();
    this.getComments.emit(); //sends event to commentlist/comment to reload comments/responses after new comment/response is added
  }
//Sends email verification link
  verifyEmail(inputEmail) {
    const lowerEmail = inputEmail.toLowerCase();
    this.authService.sendSignInLink(lowerEmail, this.postSlug);
    this.toggleSentLink();
    this.toggleEmail();
  }
//finds user using a user id
  async findUser() {
    const tempUser = await this.commentService.findUser(this.userId);
    if (tempUser) {
      this.user = tempUser;
    }
  }
//verifys user after they click the link in their email
  async verifyApiKey() {
    const userInfo = await this.authService.confirmSignIn();
    if (userInfo !== 'Unverified') { //if user is verified adds new user if the user is not in firebase already
      this.userId = userInfo[0];
      await this.findUser();
      if (!this.user) {
        const newUser = {
          email: userInfo[1],
          name: ''
        };
        this.commentService.setUser(newUser, userInfo[0]);
      }
    } else { //if not verfied prompts for email again
      this.showUnverified = true;
      this.toggleEmail();
    }
  }
//checks for logged in user and either prompts for email to login or shows add comment form
  checkLogin(){
    if(this.userId){
      this.toggleForm();
    }else{
      this.toggleEmail();
    }
  }

}
