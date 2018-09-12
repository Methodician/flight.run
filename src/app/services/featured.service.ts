import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FeaturedService {
  constructor() { }

  async getListItems(parent){
    const result = await firebase.database().ref(`/${parent}/${parent}-slugs`).once('value');
    const listItems = result.val();
    return listItems;
  }

  async getFeaturedItems(parent, featuredType){
    const result = await firebase.database().ref(`/${parent}/${featuredType}`).once('value');
    const featuredItems = result.val();
    return featuredItems;
  }

  async setFeaturedItem(parent,featuredType, featuredItems){
    await firebase.database().ref(`/${parent}/${featuredType}`).set(featuredItems);
    return;
  }
}
