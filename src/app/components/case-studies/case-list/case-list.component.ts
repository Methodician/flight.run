import { Component, OnInit } from '@angular/core';
import { CaseService } from '@services/case.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  cases;
  casesMetaData;
  constructor(
    private caseService: CaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCases();
  }

  async getCases() {
    const results = await this.caseService.getCases();
    this.cases = results.data;
    this.casesMetaData = results.meta;
  }

}
