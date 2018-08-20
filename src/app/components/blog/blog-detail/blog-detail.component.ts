import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fly-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  slug: string;
  post;
  date;
  constructor(private blogService: BlogService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.slug = this.route.params['_value']['slug'];
    this.getPostBySlug(this.slug);
  }

  async getPostBySlug(slug) {
    const result = await this.blogService.getPostBySlug(slug);
    this.post = result.data;
    this.date = new Date(this.post.published).toDateString();
  }

}
