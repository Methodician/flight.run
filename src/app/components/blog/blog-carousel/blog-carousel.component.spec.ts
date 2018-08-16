import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCarouselComponent } from './blog-carousel.component';

describe('BlogCarouselComponent', () => {
  let component: BlogCarouselComponent;
  let fixture: ComponentFixture<BlogCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
