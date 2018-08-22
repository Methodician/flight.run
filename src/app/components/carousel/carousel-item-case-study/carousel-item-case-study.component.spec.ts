import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemCaseStudyComponent } from './carousel-item-case-study.component';

describe('CarouselItemCaseStudyComponent', () => {
  let component: CarouselItemCaseStudyComponent;
  let fixture: ComponentFixture<CarouselItemCaseStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselItemCaseStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselItemCaseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
