import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateEmail } from '@validators/validateEmail';
import { questions } from '../questions';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'fly-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  form: FormGroup;
  surveyQuestions: any;
  values: number[] = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.surveyQuestions = questions;
    // if there a way to make this drier?
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, validateEmail]],
      cohort: ['', [Validators.required]],
      fr1: ['', Validators.required],
      fr2: ['', Validators.required],
      fr3: ['', Validators.required],
      fr4: ['', Validators.required],
      fr5: ['', Validators.required],
      fr6: ['', Validators.required],
      ap1: ['', Validators.required],
      ap2: ['', Validators.required],
      ap3: ['', Validators.required],
      ap4: ['', Validators.required],
      ap5: ['', Validators.required],
      ap6: ['', Validators.required],
      ap7: ['', Validators.required],
      ap8: ['', Validators.required],
      ap9: ['', Validators.required],
      ap10: ['', Validators.required],
      ap11: ['', Validators.required],
      ap12: ['', Validators.required],
      ap13: ['', Validators.required],
      ap14: ['', Validators.required],
      ap15: ['', Validators.required],
      ap16: ['', Validators.required],
      ip1: ['', Validators.required],
      ip2: ['', Validators.required],
      ip3: ['', Validators.required],
      ip4: ['', Validators.required],
      ip5: ['', Validators.required],
      ip6: ['', Validators.required],
      ip7: ['', Validators.required],
      ip8: ['', Validators.required],
      ip9: ['', Validators.required],
      ip10: ['', Validators.required],
      ip11: ['', Validators.required],
      ip12: ['', Validators.required],
      ip13: ['', Validators.required],
      ip14: ['', Validators.required],
      ip15: ['', Validators.required],
      ip16: ['', Validators.required]
    });
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  reset() {
    this.form.reset();
  }

  isErrorVisible(controlName: string, error: string) {
    let control = this.form.controls[controlName];
    return !control.untouched && control.errors && control.errors[error];
    // Changed to untouched since error message doesn't display if message clicked, then left empty.
    //return control.dirty && control.errors && control.errors[error];
  }
}
