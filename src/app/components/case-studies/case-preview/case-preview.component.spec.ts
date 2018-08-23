import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePreviewComponent } from './case-preview.component';

describe('CasePreviewComponent', () => {
  let component: CasePreviewComponent;
  let fixture: ComponentFixture<CasePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
