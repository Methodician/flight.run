import { Component, OnInit, Input } from '@angular/core';
import {SurveyService, Section, Question, DBCollection} from '@services/survey.service';
import { internFollowUpSurvey }from '@components/follow-up-survey/survey-generator/surveys';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'fly-survey-generator',
  templateUrl: './survey-generator.component.html',
  styleUrls: ['./survey-generator.component.scss']
})
export class SurveyGeneratorComponent implements OnInit {

  // @Input() public survey: Section[] //might need to rename section
  @Input() values: number[] = [1, 2, 3, 4, 5];
  @Input() i: number = 1;

  //form: FormGroup = new FormGroup({});
  @Input() config: any[] = [];
  surveyQuestions :any

  sections: Section;


  

  constructor(private surveyService: SurveyService, 
              private formBuilder: FormBuilder
            ) {
              ///Uncoment to add new / update survey///
              this.surveyService.writeTestSurvey(DBCollection.followUpSurvey);
             }

  ngOnInit() {
    console.log("init run");

    let section :number = 0;
    let content :number =0;
    
    //asyc code be warned 
    this.surveyService.getSurveyQuestions(DBCollection.followUpSurvey).subscribe(data => {
      console.log('from DB', data);
      this.surveyQuestions = data;
    })
   
   /* let AptitudeInterestNum :number = 0;
    let TrueFalseNum :number = 0;
    let RateNum :number = 0;
    let FreeResponseNum :number = 0;

    for(let surveySection of internFollowUpSurvey.sections)
    {
      //this.sections.push() = new Section()
      console.log(surveySection);
      if ('heading' in surveySection)
      {
        this.sections[section].setHeading(surveySection.heading);
        console.log(this.sections[section]);
      }
      else this.sections[section].setHeading("");
      //this.sections[section]

      for(let surveyContent of surveySection.surveyContent)
      {
        let tempQuestion: Question;
        let contentType: String;
        
        tempQuestion.type = surveyContent.type;
        tempQuestion.text = surveyContent.text;
        tempQuestion.required = true; // should be updated so true by default but false if such is defined in the json

        switch(surveyContent.type){
          case "Rate":{
            contentType = "Rate";
            break;
          }
          case "FreeResponse":{
            contentType = "fr";
            break;
          }
          case "TrueFalse":{
            contentType = "tf";
            break;
          }
          case "AptitudeInterest":{
            contentType = "aip";
            break;
          }
        }
        tempQuestion.key = contentType;

        this.sections[section].pushQuestion(tempQuestion);
        content++;
      }
      section++;
      content = 0;
    }

    console.log(JSON.stringify({ data: this.sections}, null, 4));

    console.log("init end");
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.config.forEach(control => group.addControl(control.name, this.formBuilder.control(null)));
    return group;
  }*/


}
}

