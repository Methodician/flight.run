import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';

@Injectable()
export class BlogService {
  butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
  constructor() { }

  async postsRef() {
    const posts = await this.butter.post
      .list({
        pate: 1,
        page_size: 10
      });
    // console.log(posts);
    if(posts){
      return posts.data;
    }
  }

  async postBySlugRef(slug) {
    try {
      const post = await this.butter.post
        .retrieve(slug);
      // console.log(post);
      if(post){
        return post.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async categoriesRef() {
    try {
      const categories = await this.butter.category.list();
      // console.log('categories', categories);
      if(categories){
        return categories.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postsByCategoryRef(category: string) {
    const posts = await this.butter.category.retrieve(category, { include: 'recent_posts' });
    // console.log('posts by category' + category, posts);
    if(posts){
      return posts.data.data;
    }
  }

}
