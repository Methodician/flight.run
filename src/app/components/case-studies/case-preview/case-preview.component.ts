import { Component, Input } from '@angular/core';

@Component({
  selector: 'fly-case-preview',
  templateUrl: './case-preview.component.html',
  styleUrls: ['./case-preview.component.scss']
})
export class CasePreviewComponent {
  @Input() page;
  constructor() {}

}
