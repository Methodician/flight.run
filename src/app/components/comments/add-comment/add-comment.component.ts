import { Component, OnInit, Input} from '@angular/core';
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
  user;
  userId;
  button;
  userEmail;
  askEmail: boolean = false;
  showForm: boolean = false;
  showUnverified: boolean = false;
  sentLink: boolean = false;

  constructor(private commentService: CommentService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //on init checks for logged in user, checks for verification link, and checks navigation
    this.getUser();
    if(this.type === "comments"){
      this.button = "Add Comment";
    } else {
      this.button = "Reply";
    }

    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        this.askEmail = false;
        this.showForm = false;
        this.showUnverified = false;
        this.sentLink = false;
      }
    });
  }
// Checks for logged in user
  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
        this.userId = this.authService.userId;
      }else {
        this.user = null;
        this.userId = null;
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
      this.user.posts[this.parentId] = true;
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
  }
//Sends email verification link
  verifyEmail(inputEmail) {
    const lowerEmail = inputEmail.toLowerCase();
    this.userEmail = inputEmail;
    this.authService.sendSignInLink(lowerEmail, this.postSlug);
    this.toggleSentLink();
    this.toggleEmail();
  }

//checks for logged in user and either prompts for email to login or shows add comment form
  checkLogin(){
    if(this.user){
      this.toggleForm();
    }else{
      this.toggleEmail();
    }
  }

}
