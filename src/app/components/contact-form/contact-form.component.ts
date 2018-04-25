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

  phoneDisplay: string = '';
  cursorPos: number = 0;

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

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', validatePhoneNumber], // maybe rework this. doesn't prevent letters.
      //phone: '',
      message: ['', Validators.required],
      timestamp: '',
      emailForwarded: false
    });
  }

  ngOnInit() {
    // experimenting logging the position
    // document.getElementById('fone').addEventListener("input", function (e:any){
    //   var target = e.target,
    //   position = target.selectionStart; // Capture initial position  
    //   target.selectionEnd = position;    //
    // });
  }

  isErrorVisible(controlName: string, error: string) {
    let control = this.form.controls[controlName];
    return !control.untouched && control.errors && control.errors[error];
    // Changed to untouched since error message doesn't display if message clicked, then left empty.
    //return control.dirty && control.errors && control.errors[error];
  }

  // kb: make active once finished testing.
  submit() {
    this.contactSvc.submitContact(this.form.value)
      .then(
      success => {
        alert('Thank you for your interest!');
        //this.notifyZapierOfContact();
        this.form.reset();
      });
  }

  displayPhone(e:any){
    this.phoneDisplay = this.phoneDisplay.replace(/[^0-9]/g, '');
  }

}
