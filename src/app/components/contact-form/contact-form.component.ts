import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ContactService } from '@services/contact.service';
import { validateEmail } from '@validators/validateEmail';
import { validatePhoneNumber } from '@validators/validatePhoneNumber';

@Component({
  selector: 'fly-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form: FormGroup;
  testForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactSvc: ContactService
  ) {
    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, validateEmail]],
    //   phone: ['', validatePhoneNumber],
    //   message: ['', Validators.required],
    //   timestamp: '',
    //   emailForwarded: ''
    // })

    this.testForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, validateEmail]],
      //phone: ['', validatePhoneNumber], this marks the phone field invalid if left empty even if not required.
      phone: '',
      message: ['', Validators.required],
      timestamp: '',
      emailForwarded: false
    });
  }

  ngOnInit() {
  }

  isErrorVisible(controlName: string, error: string) {
    let control = this.testForm.controls[controlName];
    return !control.untouched && control.errors && control.errors[error];
    // Changed to untouched since error message doesn't display if message clicked, then left empty.
    //return control.dirty && control.errors && control.errors[error];
  }

  // kb: make active once finished testing.
  submit() {
    // this.contactSvc.submitContact(this.form.value)
    //   .then(
    //   success => {
    //     alert('Thank you for your interest!');
    //     //this.notifyZapierOfContact();
    //     this.form.reset();
    //   });
    alert("this form was valid, and the submit button worked!");
  }

}
