import { Component, OnInit } from '@angular/core';
import { CaseService } from '@services/case.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {
  slug: string;
  page;
  toggleOnAll: boolean = false;
  toggleOnGroup1: boolean = false;
  toggleOnGroup2: boolean = false;
  constructor(private caseService: CaseService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.slug = params['slug'];
      }
    });
    this.getPageBySlug(this.slug);
  }

  async getPageBySlug(slug) {
    const result = await this.caseService.getPageBySlug(slug);
    if(result){
      this.page = result.data;
    }
  }

  onToggleAll() {
    this.toggleOnAll = !this.toggleOnAll;
  }

  onToggleGroup1() {
    this.toggleOnGroup1 = !this.toggleOnGroup1;
  }

  onToggleGroup2() {
    this.toggleOnGroup2 = !this.toggleOnGroup2;
  }

  checkWindowWidth() {
    if (this.toggleOnAll) {
      this.toggleOnAll = (window.innerWidth < 1024) ? false : this.toggleOnAll;
    }
    if (this.toggleOnGroup1 || this.toggleOnGroup2) {
      this.toggleOnGroup1 = (window.innerWidth >= 1024) ? false : this.toggleOnGroup1;
      this.toggleOnGroup2 = (window.innerWidth >= 1024) ? false : this.toggleOnGroup2;
    }
  }

}
