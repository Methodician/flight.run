import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

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
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
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
    if (slug === '') {
      this.router.navigate(['blog']);
    } else {
      this.router.navigate(['blog/category', slug]);
      if(this.path) {
        this.getPostsByCategory(slug);
      }
    }
  }

  selectPost(slug) {
    this.router.navigate(['blog/post', slug]);
  }

}
