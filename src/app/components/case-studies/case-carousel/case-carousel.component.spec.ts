import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCarouselComponent } from './case-carousel.component';

describe('CaseCarouselComponent', () => {
  let component: CaseCarouselComponent;
  let fixture: ComponentFixture<CaseCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
