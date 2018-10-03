import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';


@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFirestore,
  ) { }

  submitSurvey(surveyName: SurvyEnum, form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log(surveyName);
    return this.db.collection(surveyName).add(form);
  }


  getSurveyResults(surveyName: SurvyEnum) {
    return this.db.collection(surveyName, ref => {
      return ref.orderBy('timestamp', 'desc');
    });
  }

  getSurveyDetail(surveyName: SurvyEnum, surveyId) {
    return this.db.doc(`${surveyName}/${surveyId}`);
  }

}

export const enum SurvyEnum {
  // Later will replace internshipSurvey with onboardingSurvey
  // onboardingSurvey = "onboardingSurvey",
  internshipSurveys = "internshipSurveys",
  followUpSurvey = 'internFollowUpSurvey',
  testSurvey = "testSurvey"
}
