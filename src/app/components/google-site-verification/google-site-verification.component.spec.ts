import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSiteVerificationComponent } from './google-site-verification.component';

describe('GoogleSiteVerificationComponent', () => {
  let component: GoogleSiteVerificationComponent;
  let fixture: ComponentFixture<GoogleSiteVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleSiteVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSiteVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
