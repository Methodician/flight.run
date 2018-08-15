import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPreviewCardComponent } from './blog-preview-card.component';

describe('BlogPreviewCardComponent', () => {
  let component: BlogPreviewCardComponent;
  let fixture: ComponentFixture<BlogPreviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPreviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
