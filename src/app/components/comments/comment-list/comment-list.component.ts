import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  currentUser;
  commentList;
  @Input() postSlug;
  user;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.blogUser$.subscribe((user) =>{
      if(user){
        this.user = user;
      }
    });
  }
}
