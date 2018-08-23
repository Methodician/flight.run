import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fly-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  featuredPostSlugs: string[] = ['a-sad-dog', 'cool-stuff', 'excessive-title-that-is-way-too-looooooooooooooooooooooooooong', 'an-awesome-test'];
  featuredPosts = [];
  path;
  posts;
  postsMetaData;
  categories;
  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFeaturedPosts();

    if(this.route.params['_value']['slug']) {
      this.path = this.route.params['_value']['slug'];
       this.getPostsByCategory(this.path);
    } else {
      this.path = 'all-posts';
      this.getPosts();
    }
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.getCategories();
  }

  getFeaturedPosts() {
    this.featuredPostSlugs.forEach(async (slug) => {
      const result = await this.blogService.getPostBySlug(slug);
      this.featuredPosts.push(result.data);
    });
  }

  async getPosts() {
    const results = await this.blogService.getPosts();
    this.posts = results.data;
    this.postsMetaData = results.meta;
  }

  async getCategories() {
    const results = await this.blogService.getCategories();
    this.categories = results.data;
  }

  async getPostsByCategory(slug) {
    const results = await this.blogService.getPostsByCategory(slug);
    this.posts = results.recent_posts;
    this.postsMetaData = results.meta;
  }

  onCategoryChange(slug) {
    if (slug === 'all-posts') {
      this.router.navigate(['blog']);
    } else if (!this.route.params['_value']['slug']) {
      this.router.navigate(['blog/category', slug]);
    } else {
      this.router.navigate(['blog/category', slug]);
      this.getPostsByCategory(slug);
    }
  }

  selectPost(slug) {
    this.router.navigate(['blog/post', slug]);
  }

}
