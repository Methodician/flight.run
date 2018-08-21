import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.displayName;
    const photoURL = form.value.photoURL;
    this.authservice.emailSignUp(email, password, displayName, photoURL);
    this.router.navigate(['']);
  }
}
