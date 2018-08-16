import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  path;
  posts;
  postsMetaData;
  categories;
  categoriesMetaData;
  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.path = this.route.params['_value']['slug'];
    if(this.path) {
      this.getPostsByCategory(this.path);
    } else {
      this.getPosts();
    }
    this.getCategories();
  }

  async getPosts() {
    const results = await this.blogService.getPosts();
    this.posts = results.data;
    this.postsMetaData = results.meta;
  }

  async getCategories() {
    const results = await this.blogService.getCategories();
    this.categories = results.data;
    this.categoriesMetaData = results.meta;
  }

  async getPostsByCategory(slug) {
    const results = await this.blogService.getPostsByCategory(slug);
    this.posts = results.recent_posts;
    this.postsMetaData = results.meta;
  }

  onChange(slug) {
    this.router.navigate(['blog/category', slug]);
    if(this.path) {
      this.getPostsByCategory(slug);
    }
  }

  selectPost(slug) {
    this.router.navigate(['blog/post', slug]);
  }

}
