import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'fly-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  @Input() key;
  user;
  date;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.findUser();
    this.getDate();
  }

  async findUser(){
    const user = await this.commentService.findUser(this.comment.user);
    this.user = user;
  }

  getDate() {
    const tempDate = new Date(this.comment.timeStamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    console.log(tempDate);
    const formattedDate= tempDate.toLocaleDateString("en-US", options);
    console.log(formattedDate);
    this.date = formattedDate;

  }

}
