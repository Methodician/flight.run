import { Component, OnInit, ViewChild } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { SurveyFormComponent } from '@components/survey/survey-form/survey-form.component';

@Component({
  selector: 'fly-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @ViewChild(SurveyFormComponent) private formComponent;

  constructor(
    private surveySvc: SurveyService
  ) { }

  ngOnInit() {
  }

  submit(form: any){
    this.surveySvc
      .submitSurvey(form)
      .then(
        success => {
          alert('Thank you for filling out the survey!');
          this.formComponent.reset();
        }); 
  }
}
