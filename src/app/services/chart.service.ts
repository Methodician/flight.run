import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class ChartService {

  constructor(
    private db: AngularFirestore,
  ) { }

  submitSurvey(form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection('internshipSurveys').add(form);
  }

  getSurveyResults() {
    return this.db.collection('internshipSurveys', ref => {
      return ref.orderBy('timestamp', 'desc');
    });
  }

  getSurveyDetail(surveyId) {
    return this.db.doc(`internshipSurveys/${surveyId}`);
  }
}
