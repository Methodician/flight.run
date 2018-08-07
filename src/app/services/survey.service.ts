import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { testSurvey, internFollowUpSurvey,  } from '@components/follow-up-survey/survey-generator/surveys'


@Injectable()
export class SurveyService {
  constructor(
    private db: AngularFirestore,
    private http: Http
  ) { }

  writeTestSurvey(surveyName: DBCollection,){
    const ref = this.db.doc('surveys-test/surveys').collection('surveys').doc(surveyName);
    switch(surveyName){
      case DBCollection.testSurvey:{
        ref.set(testSurvey);
        break;
      }
      case DBCollection.onboardingSurvey:{
        ref.set( "");
        break;
      }
      case DBCollection.followUpSurvey:{
        ref.set(internFollowUpSurvey);
        break;
      }
    }
    
  }

  submitSurvey(surveyName: DBCollection, form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection(surveyName).add(form);
  }

  getSurveyQuestions(surveyName: DBCollection) {
      return this.db.doc('surveys-test/surveys').collection('surveys').doc(surveyName).valueChanges();

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



export class Section {
  private _heading:String;
  private content:Question[];
  
  constructor(
    heading:String,
    content: Question[])
  {
    this._heading = heading;
    this.content = content;
  }

//getters for the question class

getNumofQuestions():Number{
  return this.content.length
}
getquestions(index: Number):Question{
  return this.content[index.toString()];
}
get questionsLength():Number{
  return this.content.length
}

// setters for the question class

  setHeading(heading: String){
    this._heading = heading;
  }
  pushQuestion(question: Question){
    this.content.push(question);
  }
}
export class Question {

private _text:String;
private _type:String;
private _required:Boolean;
private _key: String;

constructor(text:String, type:String, required:Boolean, key: String)
  {
    this.text = text;
    this.type = type;
    this.key = key;
    this.required = required;
  }
//getters for the question class

get text():String{
  return this._text;
}
get type():String{
  return this._type;
}
get key():String{
   return this._key;
}
get required():Boolean{
  return this._required;
}

// setters for the question class

set text(question: String){
  this._text = question;
}
set type(type: String){
  this._type = type;
}
set key(key: String){
  this._key= key;
}
set required(required: Boolean){
  this._required = required;
}
}