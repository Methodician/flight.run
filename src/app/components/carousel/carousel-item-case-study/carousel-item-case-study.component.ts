import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-carousel-item-case-study',
  templateUrl: './carousel-item-case-study.component.html',
  styleUrls: ['./carousel-item-case-study.component.scss']
})
export class CarouselItemCaseStudyComponent {
  @Input() page;
  constructor(private router: Router) { }

  selectCase(slug) {
    this.router.navigate(['case-studies/case', slug]);
  }

}
