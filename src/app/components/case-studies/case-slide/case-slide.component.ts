import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fly-case-slide',
  templateUrl: './case-slide.component.html',
  styleUrls: ['./case-slide.component.scss']
})
export class CaseSlideComponent implements OnInit {
  @Input() page;

  constructor() { }

  ngOnInit() {
  }

  selectCase(slug) {
    this.router.navigate(['case-studies/case', slug]);
  }

}
