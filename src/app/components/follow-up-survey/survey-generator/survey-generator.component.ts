import { Component, OnInit, Input } from '@angular/core';
import {SurveyService, QuestionLocationCollection} from '@services/survey.service';
import { InternFollowUpSurvey }from './servays';
@Component({
  selector: 'fly-survey-generator',
  templateUrl: './survey-generator.component.html',
  styleUrls: ['./survey-generator.component.scss']
})
export class SurveyGeneratorComponent implements OnInit {

  // @Input() public survey: Section[] //might need to rename section

  survey = InternFollowUpSurvey;
  
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    // this.surveyService.getSurveyQuestions(QuestionLocationCollection.followUpQuestions).subscribe() 
  }
}
  export class Section {
    constructor(
      public heading:string,
      public content: Question[])
    {}
}
export class Question {
  constructor(
    public heading:string,
    public content:string)
  {}
}

