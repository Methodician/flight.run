import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTestimonialComponent } from './carousel-testimonial.component';

describe('CarouselTestimonialComponent', () => {
  let component: CarouselTestimonialComponent;
  let fixture: ComponentFixture<CarouselTestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselTestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
