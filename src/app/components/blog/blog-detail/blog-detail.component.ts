import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  slug: string;
  post;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.slug = params['slug'];
      }
    });
    this.getPostBySlug(this.slug);
  }

  async getPostBySlug(slug) {
    const result = await this.blogService.getPostBySlug(slug);
    if(result){
      this.post = result.data;
    }
  }

}
