import { Component, OnInit } from '@angular/core';
import { SurveyService, SurveyEnum } from '@services/survey.service';
import { AuthService } from '@services/auth.service';

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
    private authSvc: AuthService,
  ) { }

  ngOnInit() {

    this.surveySvc
      .getSurveyResults(SurveyEnum.onboardingSurvey)
      .snapshotChanges()
      .subscribe(surveysSnapshot => {
        const response = surveysSnapshot.map(survey => {
          return {
            id: survey.payload.doc.id,
            ...survey.payload.doc.data()
          };
        });
      this.SurveyResults = response;
      });

    // this.surveySvc
    //   .getSurveyResults()
    //   .valueChanges()
    //   .subscribe(response => {
    //     this.SurveyResults = response;
    //     console.log(response)
    //   });

    }
    logOut() {
      console.log('logout clicked'); // REMOVE
      this.authSvc.signOut();
    }

}
