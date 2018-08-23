import { Component, OnInit, OnDestroy } from '@angular/core';
import { CaseService } from '@services/case.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-case-carousel',
  templateUrl: './case-carousel.component.html',
  styleUrls: ['./case-carousel.component.scss']
})
export class CaseCarouselComponent implements OnInit {
  // Restructure into Input
  featuredCaseSlugs: string[] = ['team-toggle', 'generic-client'];
  featuredCases = [];

  slideCount: number = 2;
  slideDirection = null;
  currentSlideIndex = 0;
  previousSlideIndex = null;
  autoPlay: any;
  constructor(private caseService: CaseService, private router: Router) { }

  ngOnInit() {
    this.getPagesBySlug();
    this.resetAutoPlay();
  }

  ngOnDestroy() {
    clearInterval(this.autoPlay);
  }

  // Carousel Navigation
  previousSlide() {
    this.previousSlideIndex = this.currentSlideIndex;
    this.slideDirection = 'left-to-right';
    this.currentSlideIndex = (this.currentSlideIndex > 0) ? this.currentSlideIndex - 1 : this.slideCount - 1;
  }

  nextSlide() {
    this.previousSlideIndex = this.currentSlideIndex;
    this.slideDirection = 'right-to-left';
    this.currentSlideIndex = (this.currentSlideIndex < this.slideCount - 1) ? this.currentSlideIndex + 1 : 0;
  }

  resetAutoPlay() {
    clearInterval(this.autoPlay);
    this.autoPlay = setInterval(() => {this.nextSlide();}, 6000);
  }

  onSelectSlidePosition(index) {
    this.previousSlideIndex = this.currentSlideIndex;
    this.slideDirection = 'right-to-left';
    this.currentSlideIndex = index;
    this.resetAutoPlay();
  }

  onSelectPreviousSlide() {
    this.previousSlide();
    this.resetAutoPlay();
  }

  onSelectNextSlide() {
    this.nextSlide();
    this.resetAutoPlay();
  }

  // Carousel Slide Positions
  indicatorStatusColor(index) {
    if (index === this.currentSlideIndex) {
      return 'active';
    }
  }

  slidePosition(index) {
    if (this.slideDirection === 'right-to-left') {
      return this.animateRightToLeft(index);
    } else if (this.slideDirection === 'left-to-right') {
      return this.animateLeftToRight(index);
    } else if (this.slideDirection === null) {
      return this.setInitialPosition(index);
    }
  }

  animateRightToLeft(index) {
    if (index === this.currentSlideIndex) {
      return ' slide-in-rtl';
    } else if (index === this.previousSlideIndex) {
      return ' slide-out-rtl';
    } else {
      return ' hide-slide';
    }
  }

  animateLeftToRight(index) {
    if (index === this.currentSlideIndex) {
      return ' slide-in-ltr';
    } else if (index === this.previousSlideIndex) {
      return ' slide-out-ltr';
    } else {
      return ' hide-slide';
    }
  }

  setInitialPosition(index) {
    if (index !== this.currentSlideIndex) {
      return ' hide-slide';
    } else {
      return '';
    }
  }

  // Carousel Slide Functions
  getPagesBySlug() {
    this.featuredCaseSlugs.forEach(async (slug) => {
      const result = await this.caseService.getPageBySlug(slug);
      this.featuredCases.push(result.data);
    });
  }

  selectCase(slug) {
    this.router.navigate(['case-studies/case', slug]);
  }

}
