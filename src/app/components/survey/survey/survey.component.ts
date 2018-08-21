import { Component, OnInit, ViewChild } from '@angular/core';
import { SurveyService, DBCollection } from '@services/survey.service';
import { SurveyFormComponent } from '@components/survey/survey-form/survey-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  // TODO: see if there's another way to access form to reset it rather than use viewchild
  @ViewChild(SurveyFormComponent) private formComponent;

  constructor(
    private surveySvc: SurveyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(form: any){
    this.surveySvc
      .submitSurvey(DBCollection.onboardingSurvey ,form)
      .then(
        success => {
          alert('Thank you for filling out the survey!');
          this.router.navigate(['/home'])
        },
        error => {
          alert('There was an error with the submission. Please try again.');
          console.log("error: ", error);
        }
      );
  }

  resetForm(){
    this.formComponent.reset();
  }
}
