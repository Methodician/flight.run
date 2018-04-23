import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '@animations/router.animations';
import { projects } from './projects';

@Component({
  selector: 'fly-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class ExamplesComponent implements OnInit {

  projects:any = projects;
  projectKey: string = 'bimearth';
  selectedProjectIndex: number = 0;
  selectedProject: any;
  selectedImage: any;
  
  // kb: added these
  projectKeys: string[] = [];
  panDeltaX:number = 0;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    //  Create a new SPA "pageview" for Mouseflow:
    const win = window as any;
    win._mfq = win._mfq || [];
    win._mfq.push(['newPageView', '/examples']);
  }

  ngOnInit() {
    this.selectedProject = projects[this.projectKey];
    this.selectedImage = this.selectedProject.images[0];
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      if (params['project']) {
        this.projectKey = params['project'];
        this.selectedProject = this.projects[this.projectKey];
        this.selectedProjectIndex = this.projectKeys.indexOf(this.projectKey);
        this.selectedImage = this.selectedProject.images[0];
      }
    })
    this.projectKeys = Object.keys(this.projects);
  }

  getProjectProperty(offset:number, property:string = ''){
    let index = (this.projectKeys.indexOf(this.projectKey)) + offset;
    if (index === -1)
     index = this.projectKeys.length - 1;
    else if (index === this.projectKeys.length)
      index = 0; 
    if (property === '') {
      return this.projects[this.projectKeys[index]];
    } else {
      return this.projects[this.projectKeys[index]][property];
    }
  }

  navigateMobileSubmenu(direction:string = 'back'){
    const index = this.projectKeys.indexOf(this.projectKey);
    const offset = direction != 'back' ? 1 : -1; 
    this.router.navigateByUrl(`/examples/${this.getProjectProperty(offset, 'key')}`);
  }

  swipe(action = this.SWIPE_ACTION.RIGHT)  {
    if(action === this.SWIPE_ACTION.RIGHT) {
      this.navigateMobileSubmenu();
    }
    if(action === this.SWIPE_ACTION.LEFT ) {
      this.navigateMobileSubmenu('foward');
    }
  }

  pan(deltaX:any){
    this.panDeltaX = deltaX;
  }

  panEnd(event:any){
    this.panDeltaX = 0;
  }

  setSubmenuStyle(key:string):string{
    if (this.projectKey === key)
      return 'inactive';
    return 'active';
  }

  navigateSubmenu(key:string):void {
    this.router.navigateByUrl(`/examples/${key}`);
  }

  checkIfSelectedThumbnail(index:number){
    if(this.selectedImage === this.selectedProject.images[index])
      return "thumbnail-mobile current";
    else
      return "thumbnail-mobile";
  }

  selectImage(index):void {
    this.selectedImage = this.selectedProject.images[index];
  }

  // TODO: add animation to this
  swipeImage(action = this.SWIPE_ACTION.RIGHT){
    let currentIndex = this.selectedProject.images.indexOf(this.selectedImage);
    let newIndex;
    if(action === this.SWIPE_ACTION.RIGHT){
      newIndex = currentIndex === 0 ? this.selectedProject.images.length - 1 : currentIndex - 1;
    }
    if(action === this.SWIPE_ACTION.LEFT){
      newIndex = currentIndex === this.selectedProject.images.length - 1 ? 0 : currentIndex + 1;
    }
    this.selectedImage = this.selectedProject.images[newIndex];
  }
}
