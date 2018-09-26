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
    this.watchFeaturedPostSlugs();
    this.getCategories();
  }

  watchFeaturedPostSlugs() {
    this.featuredService.getFeaturedItemsRef("blog", "featured-posts").on('value', (snapshot) =>{
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
        if(result){
          this.featuredPosts.push(result.data);
        }
      });
    }
  }

  async getPosts() {
    const result = await this.blogService.getPosts();
    if(result){
      this.posts = result.data;
      this.postsMetaData = result.meta;
    }
  }

  async getCategories() {
    const result = await this.blogService.getCategories();
    if(result) {
      this.categories = result.data;
    }
  }

  async getPostsByCategory(slug) {
    const result = await this.blogService.getPostsByCategory(slug);
    if(result){
      this.posts = result.recent_posts;
      this.postsMetaData = result.meta;
    }
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
