import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fly-blog-preview-card',
  templateUrl: './blog-preview-card.component.html',
  styleUrls: ['./blog-preview-card.component.scss']
})
export class BlogPreviewCardComponent implements OnInit {
  @Input() post;
  date;
  constructor() { }

  ngOnInit() {
    this.createDisplayDate()
  }

  createDisplayDate() {
    const newDate = new Date(this.post.published);
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.date = monthName[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear();
  }

}
