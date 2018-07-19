import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyGeneratorComponent } from './survey-generator.component';

describe('SurveyGeneratorComponent', () => {
  let component: SurveyGeneratorComponent;
  let fixture: ComponentFixture<SurveyGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
