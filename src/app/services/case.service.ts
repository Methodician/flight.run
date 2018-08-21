import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';

@Injectable()
export class CaseService {
  butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
  constructor() { }

  async getCases() {
    console.log('here');
    
    const cases = await this.butter.page
      .list('client_case_study', {
        page: 1,
        page_size: 10
      });
    console.log(cases);
    return cases.data;
  }

  async getPageBySlug(slug) {
    try {
      const page = await this.butter.page
        .retrieve('*', slug);
      // console.log(post);
      return page.data;
    } catch (error) {
      console.log(error);
    }
  }

  
}
