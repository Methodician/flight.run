import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';


@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFirestore,
  ) { }

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
