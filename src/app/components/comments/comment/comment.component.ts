import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fly-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  
  constructor() { }

  ngOnInit() {
  }

}
