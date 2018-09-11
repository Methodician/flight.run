import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { CommentService } from '@services/comment.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  user;
  commentList;
  commentKeys;
  @Input() postSlug;

  constructor(private commentService: CommentService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['apiKey']){
        this.verifyApiKey();
      }else{
        this.getUser();
      }
    });
    this.getCommentList();
  }
//retreives comments for post
  async getCommentList() {
    const result = await this.commentService.getCommentsByParentId(this.postSlug, "comments");
    if(result){
      this.commentList = result;
      this.commentKeys = Object.keys(this.commentList);
    }

  }
//finds logged in user
  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
      }
    });
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
//finds user using a user id
  async findUser() {
    const tempUser = await this.commentService.findUser(this.userId);
    if (tempUser) {
      this.user = tempUser;
    }
  }
//signs out logged in user
  signOut(){
    this.authService.signBlogOut();
  }
}
