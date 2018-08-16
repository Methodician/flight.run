import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit {
  @Input() categories;
  @Output() changePost= new EventEmitter();
  relatedPosts = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getRealatedPosts(this.categories[0].slug);
  }

  async getRealatedPosts(slug) {
    const results = await this.blogService.getPostsByCategory(slug);
    let allPosts = results.recent_posts;
    let maxPosts = 3;
    if (allPosts.length < 3 ) {
      maxPosts = allPosts.length;
    }
    for (let i = 0; i < maxPosts; i++) {
      let index = Math.floor(Math.random() * (allPosts.length));
      this.relatedPosts.push(allPosts[index]);
      allPosts.splice(index, 1);
    }
  }

  selectPost(slug) {
    this.router.navigateByUrl('/blog/post/' + slug);
    this.changePost.emit(slug);
  }

}
