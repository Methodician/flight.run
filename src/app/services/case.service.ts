import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';

@Injectable()
export class CaseService {
  butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
  constructor() { }

  async casesRef() {
    const cases = await this.butter.page
      .list('client_case_study', {
        page: 1,
        page_size: 10
      });
    if(cases){
      return cases.data;
    }
  }

  async pageBySlugRef(slug) {
    try {
      const page = await this.butter.page
        .retrieve('*', slug);
      if(page){
        return page.data;
      }
    } catch (error) {
      console.log(error);
    }
  }


}
