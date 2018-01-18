import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class ContactService {

  constructor(
    private db: AngularFirestore
  ) { }

  submitContact(form: any) {
    form.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    form.emailForwarded = false;
    return this.db.collection('contacts').add(form);
  }

}
