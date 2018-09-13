import { Component, Input } from '@angular/core';

@Component({
  selector: 'fly-blog-preview-card',
  templateUrl: './blog-preview-card.component.html',
  styleUrls: ['./blog-preview-card.component.scss']
})
export class BlogPreviewCardComponent {
  @Input() post;
  constructor() { }

}
