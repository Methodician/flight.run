import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpSurveyMainComponent } from './follow-up-survey-main.component';

describe('FollowUpSurveyMainComponent', () => {
  let component: FollowUpSurveyMainComponent;
  let fixture: ComponentFixture<FollowUpSurveyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpSurveyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpSurveyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
