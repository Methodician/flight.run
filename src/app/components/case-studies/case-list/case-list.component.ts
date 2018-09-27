import { Component, OnInit } from '@angular/core';
import { CaseService } from '@services/case.service';
import { FeaturedService } from '@services/featured.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fly-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  cases;
  featuredCases = [];
  featuredCaseSlugs;
  casesMetaData;

  constructor(
    private caseService: CaseService,
    private featuredService: FeaturedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    this.getCases();
    this.watchFeaturedCaseSlugs();
  }

  async getCases() {
    const results = await this.caseService.getCases();
    this.cases = results.data;
    this.casesMetaData = results.meta;
  }

  watchFeaturedCaseSlugs() {
    this.featuredService.getFeaturedItemsRef("client_case_study", "featured-case-studies").on('value', (snapshot) =>{
      const featuredItems = snapshot.val();
      if(featuredItems){
        this.featuredCaseSlugs = Object.keys(featuredItems);
        this.getFeaturedCases();
      }
    });
  }

  getFeaturedCases() {
    if (this.featuredCaseSlugs) {
      this.featuredCaseSlugs.forEach(async (slug) => {
        const result = await this.caseService.getPageBySlug(slug);
        if(result){
          this.featuredCases.push(result.data);
        }
      });
    }
  }

  selectCase(slug) {
    this.router.navigate(['case-studies', slug]);
  }

}
