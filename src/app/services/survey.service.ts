import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';


@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFirestore
  ) { }

  submitSurvey(form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection('internshipSurveys').add(form);
  }

  getSurveyResults() {
    return this.db
    .collection('intershipSurveys', ref => {
      return ref
        .orderBy('timestamp', 'desc')
    });
  }
}
