import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fly-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: 'insert content...',
    theme: 'bubble'
  };

  constructor() { }

  ngOnInit() {
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill:', quill);
    console.log('the HTML:', html);
    console.log('the Text:', text);
  }

  onRightClick(e) {
    e.preventDefault();
    this.editor.theme.tooltip.edit();
    this.editor.theme.tooltip.show();
    return false;
  }

}
