import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-blog-preview-card',
  templateUrl: './blog-preview-card.component.html',
  styleUrls: ['./blog-preview-card.component.scss']
})
export class BlogPreviewCardComponent {
  @Input() post;
  constructor(private router: Router) { }

  selectPost() {
    this.router.navigate(['blog/post', this.post.slug]);
  }

}
