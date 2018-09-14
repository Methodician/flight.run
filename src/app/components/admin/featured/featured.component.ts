import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { FeaturedService } from '@services/featured.service';

@Component({
  selector: 'fly-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  itemList;
  featuredType;
  parent;
  featuredItems;
  featuredKeys;
  user;
  constructor(
    private featuredService: FeaturedService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser();
    this.featuredType = this.route.params['_value']['featuredType'];
    this.setParent();
    this.getListItems();
    this.getFeaturedItems();
  }

  getUser() {
    this.authService.adminUser$.subscribe((user) =>{
      if(user){
        this.user = user;
      }else {
        this.user = null;
      }
    });
  }

  setParent(){;
    if(this.featuredType === 'featured-posts'){
      this.parent = "blog";
    }
    if(this.featuredType === 'featured-case-studies'){
      this.parent = "client_case_study";
    }
  }

  async getListItems() {
    const result = await this.featuredService.getListItems(this.parent);
    if (result) {
      this.itemList = Object.keys(result);
    }
  }

  getFeaturedItems() {
    this.featuredService.getFeaturedItems(this.parent, this.featuredType).on('value', (snapshot) =>{
      const featuredItems = snapshot.val();
      if(featuredItems){
        this.featuredItems = featuredItems;
        this.featuredKeys = Object.keys(featuredItems);
      }
    });
  }

  toggleFeatured(item){
    if (this.featuredItems && this.featuredItems[item]) {
      this.featuredService.deleteFeaturedItem(this.parent, this.featuredType, item);
    } else {
      this.featuredService.setFeaturedItem(this.parent, this.featuredType, item);
    }
  }

  getDate(timeStamp) {
    const tempDate = new Date(timeStamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return tempDate.toLocaleDateString("en-US", options);
  }

}
