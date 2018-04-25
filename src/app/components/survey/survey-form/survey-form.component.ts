import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'fly-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      fr1: '',
      fr2: ''
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
  
}
