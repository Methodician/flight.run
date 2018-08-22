import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemBlogPostComponent } from './carousel-item-blog-post.component';

describe('CarouselItemBlogPostComponent', () => {
  let component: CarouselItemBlogPostComponent;
  let fixture: ComponentFixture<CarouselItemBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselItemBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselItemBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
