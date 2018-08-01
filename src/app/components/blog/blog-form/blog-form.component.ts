import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fly-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogFormComponent implements OnInit {
  editorContent = 'hello';

  initConfig = {
    content_css: 'sass/styles.scss'
  };

  constructor() { }

  ngOnInit() {
  }

}
