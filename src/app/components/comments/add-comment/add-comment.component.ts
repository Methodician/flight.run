import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fly-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  showForm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addComment(name, email, comment) {
    // do stuff
    this.showForm = false;
  }

}
