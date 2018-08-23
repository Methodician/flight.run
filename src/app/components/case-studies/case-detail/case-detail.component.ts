import { Component, OnInit } from '@angular/core';
import { CaseService } from '@services/case.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MediaQueryService } from '@services/media-query.service';

@Component({
  selector: 'fly-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {
  slug: string;
  page;
  showMoreUnstacked = false;
  showMoreChallenge = false;
  showMoreAccepted = false;
  slideTime: number = 10000;
  deviceGroup;
  constructor(private caseService: CaseService, private queryService: MediaQueryService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.queryService.deviceGroup.subscribe(group => {
      this.deviceGroup = group;
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.slug = this.route.params['_value']['slug'];
    this.getPageBySlug(this.slug);
  }

  async getPageBySlug(slug) {
    const result = await this.caseService.getPageBySlug(slug);
    this.page = result.data;
  }

  toggleShowMoreUnstacked(){
    this.showMoreUnstacked= !this.showMoreUnstacked;
    if(this.showMoreUnstacked === false){
      window.scrollTo(0, 350);
    }
  }

  toggleShowMoreChallenge(){
    this.showMoreChallenge= !this.showMoreChallenge;
    if(this.showMoreChallenge === false){
      window.scrollTo(0, 350);
    }
  }

  toggleShowMoreAccepted(){
    this.showMoreAccepted= !this.showMoreAccepted;
    if(this.showMoreAccepted === false && this.showMoreChallenge === false){
      window.scrollTo(0, 650);
    } else if(this.showMoreAccepted === false ){
      window.scrollTo(0, 1200);
    }
  }

  stackContent() {
    return (this.deviceGroup === 'desktop' || this.deviceGroup === 'iPadLandscape' || this.deviceGroup === 'iPadPortrait');
  }
}
