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

  getFeaturedItems(parent, featuredType){
    const result = firebase.database().ref(`/${parent}/${featuredType}`);
    return result;
  }

  async setFeaturedItem(parent,featuredType, item){
    await firebase.database().ref(`/${parent}/${featuredType}/${item}`).set(firebase.database.ServerValue.TIMESTAMP);
    return;
  }

  async deleteFeaturedItem(parent,featuredType, item){
    await firebase.database().ref(`/${parent}/${featuredType}/${item}`).remove();
    return;
  }

}
