import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@services/survey.service';

@Component({
  selector: 'fly-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss'],
  providers: [SurveyService]
})
export class SurveyResultsComponent implements OnInit {
  SurveyResults;

  constructor(
    private surveySvc: SurveyService
  ) { }

  ngOnInit() {

    // call for survey results
    this.surveySvc
      .getSurveyResults()
      .valueChanges()
      .subscribe(response => {
        this.SurveyResults = response;
      });
  }

}
