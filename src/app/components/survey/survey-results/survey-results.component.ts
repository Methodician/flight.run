import { Component, OnInit, ViewChild } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'fly-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss'],
  providers: [SurveyService]
})
export class SurveyResultsComponent implements OnInit {
  displayedColumns = ['lastName', 'firstName', 'cohort', 'timestamp'];
  SurveyResults = [];
  surveyId = '';
  DataSource: MatTableDataSource<any>;


  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private surveySvc: SurveyService,
  ) { }

  ngOnInit() {
    this.surveySvc
    .getSurveyResults()
    .snapshotChanges()
    .subscribe(surveysSnapshot => {
      const response = surveysSnapshot.map(survey => {
        return {
          id: survey.payload.doc.id,
          ...survey.payload.doc.data()
        };
      });
      this.SurveyResults = response;
      this.DataSource = new MatTableDataSource(this.SurveyResults);
      this.DataSource.sort = this.sort;
    });
  }
}
