import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';

@Injectable()
export class BlogService {
  butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
  constructor() { }

  async getPosts() {
    const posts = await this.butter.post
      .list({
        pate: 1,
        page_size: 10
      });
    // console.log(posts);
    return posts.data;
  }

  async getPostBySlug(slug) {
    try {
      console.log(slug);
      const post = await this.butter.post
        .retrieve(slug);
      // console.log(post);
      return post.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    try {
      const categories = await this.butter.category.list();
      // console.log('categories', categories);
      return categories.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getPostsByCategory(category: string) {
    const posts = await this.butter.category.retrieve(category, { include: 'recent_posts' });
    // console.log('posts by category' + category, posts);
    return posts.data.data;
  }

}
