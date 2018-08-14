import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  slug: string;
  post;
  date;
  constructor(private blogService: BlogService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.route.params['_value']['slug'];
    this.getPostBySlug(this.slug);
  }

  async getPostBySlug(slug) {
    const result = await this.blogService.getPostBySlug(slug);
    console.log(result);
    
    this.post = result.data;
    this.date = new Date(this.post.published).toDateString();
  }

  
}
