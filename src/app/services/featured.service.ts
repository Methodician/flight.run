import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable()
export class FeaturedService {
  db = firebase.database();

  constructor() { }

  async listItemsRef(parent){
    const result = await this.db.ref(`/${parent}/${parent}-slugs`).once('value');
    if(result){
      const listItems = result.val();
      return listItems;
    }
  }

  featuredItemsRef(parent, featuredType){
    const result = this.db.ref(`/${parent}/${featuredType}`);
    if(result){
      return result;
    }
  }

  async setFeaturedItem(parent,featuredType, item){
    await this.db.ref(`/${parent}/${featuredType}/${item}`).set(firebase.database.ServerValue.TIMESTAMP);
    return;
  }

  async deleteFeaturedItem(parent,featuredType, item){
    await this.db.ref(`/${parent}/${featuredType}/${item}`).remove();
    return;
  }

}
