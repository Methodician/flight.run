import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private authservice: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.emailSignUp(email, password);
    console.log('click');
  }
}
