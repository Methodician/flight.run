import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
//import { testSurvey, internFollowUpSurvey,  } from '@components/follow-up-survey/survey-generator/surveys'


@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFirestore,
  ) { }

  writeSurveyQuestions(surveyName: SurveyEnum,){
    const ref = this.db.doc('surveys-test/surveys').collection('surveys').doc(surveyName);
    switch(surveyName){
      case SurveyEnum.testSurvey:{
        //ref.set(testSurvey);
        break;
      }
      case SurveyEnum.onboardingSurvey:{
        ref.set( "");
        break;
      }
      case SurveyEnum.followUpSurvey:{
        //ref.set(internFollowUpSurvey);
        break;
      }
    }
    
  }

  submitSurvey(surveyName: SurveyEnum, form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection(surveyName).add(form);
  }


  getSurveyResults(surveyName: SurveyEnum) {
    return this.db.collection(surveyName, ref => {
      return ref.orderBy('timestamp', 'desc');
    });
  }

  getSurveyQuestions(surveyName: SurveyEnum) {
    return this.db.doc('surveys-test/surveys').collection('surveys').doc(surveyName).valueChanges();

}


  getSurveyDetail(surveyName: SurveyEnum, surveyId) {
    return this.db.doc(`${surveyName}/${surveyId}`);
  }

}

export const enum SurveyEnum {
  onboardingSurvey = "onboardingSurvey",
  followUpSurvey = 'internFollowUpSurvey',
  testSurvey = "testSurvey"
}
