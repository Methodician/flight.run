
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router } from '@angular/router';
import { getPluralCategory } from '../../../../../node_modules/@angular/common/src/i18n/localization';

@Component({
  selector: 'fly-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit {
  @Input() post;
  @Output() changePost= new EventEmitter();
  relatedPosts = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getRelatedPosts();
  }

  //finds three posts with the most related categories. works if you use the hard coded array but not when receiving an array
  countPostSlugs(postSlugs) {
    let relatedPostSlugs: string[] = [];
    let counts = {};
    let compare0 = 0;
    let compare1 = 0;
    let compare2 = 0;

    postSlugs.forEach(slug => {
      if(counts[slug]){
        counts[slug] += 1;
      }else {
        counts[slug] = 1;
      }

      if(counts[slug] > compare0 && relatedPostSlugs.indexOf(slug) === -1){
        compare0 = counts[slug];
        relatedPostSlugs[0] = slug;
      }else if (counts[slug] > compare1 && relatedPostSlugs.indexOf(slug) === -1){
        compare1 = counts[slug];
        relatedPostSlugs[1] = slug;
      }else if (counts[slug] > compare2 && relatedPostSlugs.indexOf(slug) === -1){
        compare2 = counts[slug];
        relatedPostSlugs[2] = slug;
      }else {
        //do nothing
      }
      
    });
    
    return relatedPostSlugs;
  }

//creates an array of all posts slugs for all matching categories, including duplicates but not the original post
async getRelatedPostSlugs() {
  let postSlugs = [];
  await this.asyncForEach(this.post.categories, async category => {
    let result = await this.blogService.getPostsByCategory(category.slug);
    result.recent_posts.forEach(relatedPost => {
      if (relatedPost.slug !== this.post.slug) {
        postSlugs.push(relatedPost.slug);
      }
    });
  });
  
  return postSlugs;
}

async asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

//gets all related posts using related post slugs
  async getRelatedPosts() {
    const postSlugs = await this.getRelatedPostSlugs();
    const relatedPostSlugs = this.countPostSlugs(postSlugs);
    
    relatedPostSlugs.forEach(async slug => {
      const result = await this.blogService.getPostBySlug(slug);
      this.relatedPosts.push(result.data);
    });
  }

  async selectPost(slug) {
    this.router.navigateByUrl('/blog/post/' + slug);
    this.changePost.emit(slug);
    let result = await this.blogService.getPostBySlug(slug);
    this.post = result.data;
    this.relatedPosts = [];
    this.getRelatedPosts();
  }

}


