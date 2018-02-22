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
  // phoneDisplay = {
  //   area: '',
  //   prefix: '',
  //   line: ''
  // };

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

    this.testForm = this.fb.group({
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
    document.getElementById('fone').addEventListener("input", function (e:any){
      var target = e.target,
      position = target.selectionStart; // Capture initial position  
      target.selectionEnd = position;    //
    });
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

  displayPhone(e:any){
    //this.cursorPos = event.target.selectionStart;
    
    if ((e.keyCode  >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
      this.phoneDisplay = this.phoneDisplay.replace(/[^0-9]/g, '');
      if (this.phoneDisplay.length > 3) {
        if (this.phoneDisplay.length > 6) {
          this.phoneDisplay = this.phoneDisplay.substring(0,6) + " - " + this.phoneDisplay.substring(6);
        }
        this.phoneDisplay = "(" + this.phoneDisplay.substring(0,3) + ") " + this.phoneDisplay.substring(3);
    }
      console.log(this.phoneDisplay + "  this is the selection start " + e.target.selectionStart);
    } else if ( e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
      // prevents non-numeric keys other than backspace and arrow keys from entering input
      e.preventDefault();
    }
  }

}
