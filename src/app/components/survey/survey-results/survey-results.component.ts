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
  SurveyResults = [];
  DataSource = new MatTableDataSource(this.SurveyResults);
  surveyId = '';
  diaplayedColumns = ['lastName', 'firstName', 'cohort'];

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
      this.DataSource.sort = this.sort;
      console.log(this.SurveyResults);
      
      });

      // this.surveySvc
      //   .getSurveyResults()
      //   .valueChanges()
      //   .subscribe(response => {
        //     this.SurveyResults = response;
        //     console.log(response)
        //   });



}
