import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSlideComponent } from './image-slide.component';

describe('ImageSlideComponent', () => {
  let component: ImageSlideComponent;
  let fixture: ComponentFixture<ImageSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
