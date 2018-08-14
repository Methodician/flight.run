import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-blog-preview-card',
  templateUrl: './blog-preview-card.component.html',
  styleUrls: ['./blog-preview-card.component.scss']
})
export class BlogPreviewCardComponent implements OnInit {
  @Input() post;
  date;
  constructor(private router: Router) {}

   ngOnInit() { 
    this.date = new Date(this.post.published).toDateString();
  }

  selectPost() {
    this.router.navigate(['blog/post', this.post.slug]);
  }

}
