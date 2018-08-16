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
    this.getRelatedPosts();
  }

  countPostSlugs(postSlugs) {
    console.log(postSlugs);
    
    // let postSlugs = ['a-sad-dog', 'cool-stuff', 'excessive-title-that-is-way-too-looooooooooooooooooooooooooong', 'an-awesome-test','a-sad-dog', 'a-sad-dog', 'cool-stuff', ];
    let relatedPostSlugs: string[] = [];
    let counts = {};
    let compare0 = 0;
    let compare1 = 0;
    let compare2 = 0;
    console.log(postSlugs);
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
      console.log(relatedPostSlugs);
      
    });
    console.log(postSlugs);
    
    
    return relatedPostSlugs;
  }

  getRelatedPostSlugs(){
    let postSlugs: string[] = [];
    this.post.categories.forEach(async category => {
      let result = await this.blogService.getPostsByCategory(category.slug);
      result.recent_posts.forEach(post => {
        if(post.slug !== this.post.slug){
            postSlugs.push(post.slug);
          }
      });     
    });
    
    return postSlugs;
  }

  async getRelatedPosts() {
    const postSlugs = await this.getRelatedPostSlugs();
    
    const relatedPostSlugs = this.countPostSlugs(postSlugs);
    console.log(relatedPostSlugs);
    // relatedPostSlugs.forEach(async slug => {
    //   const result = await this.blogService.getPostBySlug(slug);
    //   this.relatedPosts.push(result.data);
    // });
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
