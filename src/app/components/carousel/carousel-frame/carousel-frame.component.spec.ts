import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFrameComponent } from './carousel-frame.component';

describe('CarouselFrameComponent', () => {
  let component: CarouselFrameComponent;
  let fixture: ComponentFixture<CarouselFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
