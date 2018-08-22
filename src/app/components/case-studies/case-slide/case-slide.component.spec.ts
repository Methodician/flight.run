import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSlideComponent } from './case-slide.component';

describe('CaseSlideComponent', () => {
  let component: CaseSlideComponent;
  let fixture: ComponentFixture<CaseSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
