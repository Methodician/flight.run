import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FeaturedService {
  constructor() { }

  getListItems(parent){
    const result = firebase.database().ref(`/${parent}/${parent}-slugs`).once('value');
    const listItems = result.val();
    return listItems;
  }

  getFeaturedItems(parent, featuredType){
    const result = firebase.database().ref(`/${parent}/${featuredType}`).once('value');
    const featuredItems = result.val();
    return featuredItems;
  }

  setFeaturedItem(parent,featuredType, featuredItems){
    firebase.database().ref(`/${parent}/${featuredType}`).set(featuredItems);
  }
}
