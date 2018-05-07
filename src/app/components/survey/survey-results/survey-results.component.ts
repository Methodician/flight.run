import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss'],
  providers: [SurveyService]
})
export class SurveyResultsComponent implements OnInit {
  SurveyResults = [];
  surveyId = '';

  constructor(
    private surveySvc: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // capture id from route
    this.route.params.subscribe(params => {
      this.surveyId = params.id
      console.log(this.surveyId)
    });

    // this.surveySvc
    //   .getSurveyResults()
    //   .valueChanges()
    //   .subscribe(response => {
    //     this.SurveyResults = response;
    //     console.log(response)
    //   });

    this.surveySvc
      .getSurveyResults()
      .snapshotChanges()
      .subscribe(surveysSnapshot => {
        const response = surveysSnapshot.map(survey => {
          return {
            id: survey.payload.doc.id,
            ...survey.payload.doc.data()
          }
        });
      this.SurveyResults = response;
      })
    }

}
