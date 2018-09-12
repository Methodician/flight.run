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
  constructor(private featuredService: FeaturedService, private authService: AuthService) { }

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

  getListItems() {
    this.listItems = this.featuredService.getListItems(this.parent);
  }

  getFeaturedItems() {
    this.listItems = this.featuredService.getFeaturesItems(this.parent, this.featuredType);
  }

}
