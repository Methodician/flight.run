import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';

@Component({
  selector: 'fly-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  posts;
  postsMetaData;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getPosts();
  }

  async getPosts() {
    const results = await this.blogService.getPosts();
    this.posts = results.data;
    this.postsMetaData = results.meta;
    console.log(this.posts);
  }

  async getCategories() {
    const categories = await this.blogService.getCategories();
    console.log(categories);
  }

  async getPostsByCategory(slug) {
    const posts = await this.blogService.getPostsByCategory(slug);
    console.log(posts);
  }

}
