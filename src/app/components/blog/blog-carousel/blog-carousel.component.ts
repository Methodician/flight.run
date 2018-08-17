import { Component, OnInit } from '@angular/core';
import { BlogService } from '@services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fly-blog-carousel',
  templateUrl: './blog-carousel.component.html',
  styleUrls: ['./blog-carousel.component.scss']
})
export class BlogCarouselComponent implements OnInit {
  featuredPostSlugs: string[] = ['a-sad-dog', 'cool-stuff', 'excessive-title-that-is-way-too-looooooooooooooooooooooooooong', 'an-awesome-test'];
  featuredPosts = [];
  carouselLength: number = this.featuredPostSlugs.length;
  currentItem = 0;
  autoPlay: any;
  autoTimeout: any;
  items: HTMLCollectionOf<Element>;
  post;
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getPostsBySlug();
    this.items = document.getElementsByClassName('item');
    this.autoPlay = setInterval(() => {
      this.carouselForward();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.autoPlay);
    clearTimeout(this.autoTimeout);
  }

  indicatorStatus(index) {
    if (index === this.currentItem) {
      return 'active';
    }
  }

  getPostsBySlug() {
    this.featuredPostSlugs.forEach(async (slug) => {
      const result = await this.blogService.getPostBySlug(slug);
      this.featuredPosts.push(result.data);
    });
  }

  carouselForward() {
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-out-rtl');
    this.items
      .item(this.currentItem)
      .classList
      .remove('slide-in-rtl', 'slide-in-ltr');
    if (this.currentItem === (this.carouselLength - 1)) {
      this.currentItem = 0;
    } else {
      this.currentItem++;
    }
    this.items
      .item(this.currentItem)
      .classList
      .remove('item-stage-right', 'slide-out-rtl', 'slide-out-ltr');
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-in-rtl');
  }

  carouselBackward() {
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-out-ltr');
    this.items
      .item(this.currentItem)
      .classList
      .remove('slide-in-rtl', 'slide-in-ltr');
    if (this.currentItem === 0) {
      this.currentItem = this.carouselLength - 1;
    } else {
      this.currentItem--;
    }
    this.items
      .item(this.currentItem)
      .classList
      .remove('item-stage-right', 'slide-out-rtl', 'slide-out-ltr');
    this.items
      .item(this.currentItem)
      .classList
      .add('slide-in-ltr');
  }

  onSelectPreviousSlide() {
    this.carouselBackward();
    this.resetAutoPlay();
  }

  onSelectNextSlide() {
    this.carouselForward();
    this.resetAutoPlay();
  }

  resetAutoPlay() {
    clearInterval(this.autoPlay);
    clearTimeout(this.autoTimeout);
    this.autoTimeout = setTimeout(() => {
      this.autoPlay = setInterval(() => {
        this.carouselForward();
      }, 5000);
    }, 5000);
  }

  selectPost(slug) {
    this.router.navigate(['blog/post', slug]);
  }
}
