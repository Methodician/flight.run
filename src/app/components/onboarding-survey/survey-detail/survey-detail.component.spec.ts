import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDetailComponent } from '@components/onboarding-survey/survey-detail/survey-detail.component';

describe('SurveyDetailComponent', () => {
  let component: SurveyDetailComponent;
  let fixture: ComponentFixture<SurveyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
