import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'fly-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {
  surveyId = '';
  SurveyDetail;


  constructor(
    private surveySvc: SurveyService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

      this.route.params.subscribe(params => {
        this.surveyId = params.id
        this.surveySvc
        .getSurveyDetail(this.surveyId)
        .valueChanges()
        .subscribe(response => {
          this.SurveyDetail = response;
          console.log(response);
        });          
      });
  }

  goBack() {
    this.location.back();
  }

}
