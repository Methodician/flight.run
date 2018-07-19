import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Http } from '@angular/http';



@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFirestore,
    private http: Http
  ) { }

  

  submitSurvey(surveyCollection: DBCollection, form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection(surveyCollection).add(form);
  }

  getSurveyResults(surveyCollection: DBCollection) {
    return this.db.collection(surveyCollection, ref => {
      return ref.orderBy('timestamp', 'desc');
    });
  }

  getSurveyDetail(surveyCollection: DBCollection, surveyId) {
    return this.db.doc(`${surveyCollection}/${surveyId}`);
  }

}

export const enum DBCollection {
  onboardingSurvey = "internshipSurveys",
  followUpSurvey = ""
}

export const enum QuestionLocationCollection {
  onboardingSurveyQuestions = "@components\\follow-up-survey\\follow-up-survey.json",
  followUpSurveyQuestions = "@components\\follow-up-survey\\follow-up-survey.json"
}
