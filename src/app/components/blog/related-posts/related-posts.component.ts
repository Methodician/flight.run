import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '@services/blog.service';

@Component({
  selector: 'fly-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit, OnChanges {
  @Input() post;
  @Output() changePost= new EventEmitter();
  relatedPosts = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getRelatedPosts();
  }

  ngOnChanges(changes: SimpleChanges) {
    const isInitialChange = changes['post']['firstChange'];
    if(!isInitialChange) {
      window.scrollTo(0, 0);
      this.getRelatedPosts();
    }
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
      let result = await this.blogService.postsByCategoryRef(category.slug);
      if(result){
        result.recent_posts.forEach(relatedPost => {
          if (relatedPost.slug !== this.post.slug) {
            postSlugs.push(relatedPost.slug);
          }
        });
      }
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
    this.relatedPosts = [];
    const postSlugs = await this.getRelatedPostSlugs();
    if(postSlugs){
      const relatedPostSlugs = this.topMatches(postSlugs, 3);

      relatedPostSlugs.forEach(async slug => {
        const result = await this.blogService.postBySlugRef(slug);
        if(result){
          this.relatedPosts.push(result.data);
        }
      });
    }
  }

  async reinitializePost(slug) {
    this.changePost.emit(slug);
  }

}
