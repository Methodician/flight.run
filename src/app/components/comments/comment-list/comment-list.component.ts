import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { CommentService } from '@services/comment.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  constructor(private commentService: CommentService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUser();
    this.route.queryParams.subscribe((params: Params) => {
      if(params['apiKey']){
        this.verifyApiKey();
      }
    });
    this.getCommentList();
  }
//retreives comments for post
  getCommentList() {
    this.commentService.getCommentsByParentId(this.postSlug, "comments").on('value', (snapshot) => {
       const comments = snapshot.val();
       if(comments){
        this.commentList = comments;
        this.commentKeys = Object.keys(this.commentList);
       }
    });
  }
//finds logged in user
  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
      }else {
        this.user = null;
      }
    });
  }
//verifys user after they click the link in their email
  async verifyApiKey() {
    const userInfo = await this.authService.confirmSignIn();
    if (userInfo) { //if user is verified adds new user if the user is not in firebase already
      const user = await this.commentService.findUserOnce(userInfo[0]);
      if (!user) {
        const newUser = {
          email: userInfo[1],
          name: ''
        };
        this.commentService.setUser(newUser, userInfo[0]);
      }
    }
    this.router.navigate(['blog/post', this.postSlug]);
  }
//finds user using a user id
  async findUser(userId) {
    const tempUser = await this.commentService.findUser(userId);
    if (tempUser) {
      return tempUser;
    }
  }
//signs out logged in user
  signOut(){
    this.authService.signBlogOut();
  }
}
