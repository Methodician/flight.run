
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

  topMatches(postSlugs: Array<string>, numberOfMatchesToReturn?: number): Array<string> {
    // Makes it flexible in case we want to return a different number of matches
    let returnCount = numberOfMatchesToReturn || 3;
    const uniqueSlugs = Array.from(new Set(postSlugs));
    if (uniqueSlugs.length < returnCount)
      returnCount = uniqueSlugs.length;

    // count each unique slug in the original array, creating an array of objects we can sort
    const slugCounts = [];
    for (let slug of uniqueSlugs) {
      const count = this.countOccurrences(slug, postSlugs);
      slugCounts.push({ count: count, slug: slug });
    }
    // sort array in descending order based on count
    slugCounts.sort((a, b) => {
      return b.count - a.count;
    });
    // Create new array of slugs from the top * matches based on count
    let topMatches = [];
    for (let i = 0; i < returnCount; i++) {
      topMatches[i] = slugCounts[i].slug;
    }

    return topMatches;
  }

  countOccurrences(stringToMatch: string, arrayToCheck: Array<string>) {
    let matchCount = 0;
    for (let slug of arrayToCheck) {
      if (slug === stringToMatch)
        matchCount++;
    }
    return matchCount;
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
    const relatedPostSlugs = this.topMatches(postSlugs, 3);
    
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


