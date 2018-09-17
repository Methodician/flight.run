import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { FeaturedService } from '@services/featured.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fly-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  featuredPostSlugs;
  featuredPosts = [];
  path;
  posts;
  postsMetaData;
  categories;

  constructor(
    private blogService: BlogService,
    private featuredService: FeaturedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.path = params['slug']
        this.getPostsByCategory(this.path);
      }else {
        this.path = 'all-posts';
        this.getPosts();
      }
    });
    
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.getFeaturedPostSlugs();
    this.getCategories();
  }

  getFeaturedPostSlugs() {
    this.featuredService.getFeaturedItems("blog", "featured-posts").on('value', (snapshot) =>{
      const featuredItems = snapshot.val();
      if(featuredItems){
        this.featuredPostSlugs = Object.keys(featuredItems);
        this.getFeaturedPosts();
      }
    });
  }

  getFeaturedPosts() {
    if (this.featuredPostSlugs) {
      this.featuredPostSlugs.forEach(async (slug) => {
        const result = await this.blogService.getPostBySlug(slug);
        this.featuredPosts.push(result.data);
      });
    }
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
