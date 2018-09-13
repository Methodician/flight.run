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
  date;
  constructor(private blogService: BlogService, public route: ActivatedRoute, private router: Router) { }

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
    this.post = result.data;
    this.createDisplayDate()
  }

  createDisplayDate() {
    const newDate = new Date(this.post.published);
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.date = monthName[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear();
  }

}
