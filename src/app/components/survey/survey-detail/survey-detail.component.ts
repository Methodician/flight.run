import { Component, OnInit } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { questions } from '../../../shared/questions';

@Component({
  selector: 'fly-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {
  surveyId = '';
  surveyAnswers: any;
  frAnswers: string[] = [];
  apAnswers: string[] = [];
  ipAnswers: string[] = [];
  surveyQuestions: any;


  constructor(
    private surveySvc: SurveyService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.surveyQuestions = questions;

    this.route.params.subscribe(params => {
      this.surveyId = params.id
      this.surveySvc
      .getSurveyDetail(this.surveyId)
      .valueChanges()
      .subscribe(response => {
        this.surveyAnswers = response;
        console.log(response);
        this.frAnswers.push(this.surveyAnswers.fr1)
        this.frAnswers.push(this.surveyAnswers.fr2)
        this.frAnswers.push(this.surveyAnswers.fr3)
        this.frAnswers.push(this.surveyAnswers.fr4)
        console.log(this.frAnswers)
      });          
    });
  }

  goBack() {
    this.location.back();
  }

}
