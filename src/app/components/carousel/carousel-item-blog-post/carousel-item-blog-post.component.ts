import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-carousel-item-blog-post',
  templateUrl: './carousel-item-blog-post.component.html',
  styleUrls: ['../carousel-shared/carousel-item.component.scss']
})
export class CarouselItemBlogPostComponent {
  @Input() post;
  constructor(private router: Router) { }

}
