
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router } from '@angular/router';

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
    this.getRelatedPostSlugs();
  }

  //finds three posts with the most related categories. works if you use the hard coded array but not when receiving an array
  countPostSlugs(postSlugs) {
    console.log(postSlugs);
    
    // let postSlugs = ['a-sad-dog', 'cool-stuff', 'excessive-title-that-is-way-too-looooooooooooooooooooooooooong', 'an-awesome-test','a-sad-dog', 'a-sad-dog', 'cool-stuff', ];
    let relatedPostSlugs: string[] = [];
    let counts = {};
    let compare0 = 0;
    let compare1 = 0;
    let compare2 = 0;
    //for some reason it won't enter this loop
    postSlugs.forEach(slug => {
      console.log('here');
      
      if(counts[slug]){
        counts[slug] += 1;
      }else {
        counts[slug] = 1;
      }

      if(counts[slug] > compare0 && this.relatedPosts.indexOf(slug) === -1){
        compare0 = counts[slug];
        relatedPostSlugs[0] = slug;
      }else if (counts[slug] > compare1 && this.relatedPosts.indexOf(slug) === -1){
        compare1 = counts[slug];
        relatedPostSlugs[1] = slug;
      }else if (counts[slug] > compare2 && this.relatedPosts.indexOf(slug) === -1){
        compare2 = counts[slug];
        relatedPostSlugs[2] = slug;
      }else {

      }
      
    });
    
    
    return relatedPostSlugs;
  }

//creates an array of all posts slugs for all matching categories, including duplicates but not the original post
  getRelatedPostSlugs(){
    let postSlugs = [];
    this.post.categories.forEach(async category => {
      let result = await this.blogService.getPostsByCategory(category.slug);
      result.recent_posts.forEach(relatedPost => {
        if(relatedPost.slug !== this.post.slug){
            postSlugs.push(relatedPost.slug)
            console.log('inside', postSlugs);
            
          }
      });   
    });
    console.log('just before return', postSlugs);
    
    return postSlugs;
  }

//gets all related posts using related post slugs
  async getRelatedPosts() {
    const postSlugs = await this.getRelatedPostSlugs();
    
    const relatedPostSlugs = this.countPostSlugs(postSlugs);
    console.log(relatedPostSlugs);
    relatedPostSlugs.forEach(async slug => {
      const result = await this.blogService.getPostBySlug(slug);
      this.relatedPosts.push(result.data);
    });
  }

  // async getRealatedPosts(slug) {
  //   const results = await this.blogService.getPostsByCategory(slug);
  //   let allPosts = [];
  //   results.recent_posts.forEach(relatedPost => {
  //     if(relatedPost.slug !== this.post.slug){
  //       allPosts.push(relatedPost);
  //     }
  //   });
  //   let maxPosts=3;
  //   if(allPosts.length<3){
  //     maxPosts=allPosts.length;
  //   }
  //   for(let i=0; i<maxPosts; i++) {
  //     let index = Math.floor(Math.random()*(allPosts.length));
  //     this.relatedPosts.push(allPosts[index]);
  //     allPosts.splice(index,1);
  //   }
  // }
  selectPost(slug) {
    this.router.navigateByUrl('/blog/post/' + slug);
    this.changePost.emit(slug);
  }

}


