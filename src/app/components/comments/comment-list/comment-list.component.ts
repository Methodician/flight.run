import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fly-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  commentList;
  @Input() postSlug;
  constructor() { }

  ngOnInit() {
  }

}
