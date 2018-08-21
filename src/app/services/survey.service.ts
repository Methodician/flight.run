import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';


@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFirestore,
  ) { }

  submitSurvey(surveyName: DBCollection, form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection(surveyName).add(form);
  }


  getSurveyResults(surveyName: DBCollection) {
    return this.db.collection(surveyName, ref => {
      return ref.orderBy('timestamp', 'desc');
    });
  }

  getSurveyDetail(surveyName: DBCollection, surveyId) {
    return this.db.doc(`${surveyName}/${surveyId}`);
  }

}

export const enum DBCollection {
  onboardingSurvey = "onboardingSurvey",
  followUpSurvey = 'internFollowUpSurvey',
  testSurvey = "testSurvey"
}
