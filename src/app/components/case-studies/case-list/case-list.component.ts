import { Component, OnInit } from '@angular/core';
import { CaseService } from '@services/case.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fly-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  path;
  cases;
  page;
  casesMetaData;
  constructor(private caseService: CaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    this.path = this.route.params['_value']['slug'];
    this.getCases();
    
  }

  async getCases() {
    const results = await this.caseService.getCases();
    this.cases = results.data;
    this.casesMetaData = results.meta;
    console.log(this.cases);
    
  }

  selectCase(slug) {
    this.router.navigate(['case-studies/case', slug]);
  }

}

