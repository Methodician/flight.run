import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemSupportingImageComponent } from './carousel-item-supporting-image.component';

describe('CarouselItemSupportingImageComponent', () => {
  let component: CarouselItemSupportingImageComponent;
  let fixture: ComponentFixture<CarouselItemSupportingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselItemSupportingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselItemSupportingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
