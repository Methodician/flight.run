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
  user;
  constructor(private featuredService: FeaturedService, private authService: AuthService, private route: ActivatedRoute) { }

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
    if(result){
      this.listItems = Object.keys(result);
    }
  }

  async getFeaturedItems() {
    const result = await this.featuredService.getFeaturedItems(this.parent, this.featuredType);
    if(result){
      this.featuredItems = result;
      this.featuredKeys = Object.keys(result);
    }
  }

  toggleFeatured(item){
    console.log('click', item);
  }

}
