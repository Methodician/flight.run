import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '@animations/router.animations';

@Component({
  selector: 'fly-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class ExamplesComponent implements OnInit {

  projectKey: string = 'bimearth';
  selectedProject: any;
  selectedImage: any;
  
  // kb: added these
  projectKeys: string[] = [];
  mobile: boolean = false;
  submenuVisible: boolean = false;
  arrowDirection: string = "submenu-arrow right";
  // arrow: string = "▼";
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
    this.selectedProject = this.projects[this.projectKey];
    this.selectedImage = this.selectedProject.images[0];
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      if (params['project']) {
        this.projectKey = params['project'];
        this.selectedProject = this.projects[this.projectKey];
        this.selectedImage = this.selectedProject.images[0];
      }
    })
    this.projectKeys = Object.keys(this.projects);
  }

  selectImage(index):void {
    this.selectedImage = this.selectedProject.images[index];
  }

  // toggleMobileSubmenu():void {
  //   // this.submenuVisible != true ? this.submenuVisible = true : this.submenuVisible = false;
  //   if (this.submenuVisible != true) {
  //     this.submenuVisible = true;
  //     this.arrowDirection = "submenu-arrow down";
  //   } else {
  //     this.submenuVisible = false;
  
  //     this.arrowDirection = "submenu-arrow right";
  //   }
  // }

  navigateMobileSubmenu(index:number):void {
    console.log(index, "Hi this the index");
    if (index === -1)
      index = this.projectKeys.length - 1;
    else if (index === this.projectKeys.length)
      index = 0;
      
    const key = this.projects[this.projectKeys[index]].key;
    this.router.navigateByUrl(`/examples/${key}`);
  }

  navigateSubmenu(key:string):void {
    console.log(key);
    this.router.navigateByUrl(`/examples/${key}`);
  }

  checkIfSelected(index:number){
    if(this.selectedImage === this.selectedProject.images[index])
      return "thumbnail-mobile current";
    else
      return "thumbnail-mobile";
    // console.log(this.selectedImage);
    // console.log(this.selectedProject.images[index]);
  }

  checkIfSelectedProject(project:string){
    if(this.projectKey === project){
      return "swipe-box visible";
    }
    else
      return "hidden";
    
  }

  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT)  {
    // out of range

    if(currentIndex > this.projectKeys.length || currentIndex < 0) return;

    let nextIndex = 0;

    //swipe right, next project
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isLast = currentIndex === this.projectKeys.length - 1;
      nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // swipe left, prev project
    if (action === this.SWIPE_ACTION.LEFT) {
      const isFirst = currentIndex === 0;
      nextIndex = isFirst ? this.projectKeys.length - 1 : currentIndex - 1;
    }

    this.router.navigateByUrl(`/examples/${this.projectKeys[nextIndex]}`);
  }

  setSubmenuStyle(key:string){
    this.projectKey === key ? 'active' : 'inactive';
  }

  pan(deltaX:any){
    this.panDeltaX = deltaX;
  }

  panEnd(event:any){
    this.panDeltaX = 0;
  }

  getUnselectedProject(index: number):string{
    if (index === 0 )
      return this.projects[this.projectKeys[this.projectKeys.length - 1]].title;
    else
      return this.projects[this.projectKeys[index - 1]].title;
  }

  projects = {
    bimearth: {
      title: 'BIM Earth',
      key: 'bimearth',
      // routerLink: "['/examples/bimearth']",
      images: [
        {
          path: 'assets/BIM/bim2.png',
          description: 'Login Page',
          alt: 'Login Page'
        },
        {
          path: 'assets/BIM/bim1.png',
          description: 'Information on a Location',
          alt: 'Boundary'
        },
        {
          path: 'assets/BIM/bim3.png',
          description: 'User Account',
          alt: 'User Account'
        },
        {
          path: 'assets/BIM/bim4.png',
          description: 'Map Filter',
          alt: 'Map Filter'
        },
        {
          path: 'assets/BIM/bim5.png',
          description: 'Logged-in User and Menu',
          alt: 'Logged-in User'
        }
      ],
      blurb: 'BIM Earth makes associating geographical boundaries with data, easy, intuitive and practical. Boundaries fit into categories called "channels" which are color coded and filtered. You can upload files, videos, pictures and blog post to the boundaries to refer to later or share with your friends! '
    },
    scatterschool: {
      title: 'Scatter School',
      key: 'scatterschool',
      // routerLink: "['/examples/scatterschool']",
      images: [
        {
          path: 'assets/scatterschool/scatterschool1.png',
          description: 'Scatter School Home Page',
          alt: 'Scatter School Home Page'
        },
        {
          path: 'assets/scatterschool/scatterschool2.png',
          description: 'Posting an Article',
          alt: 'Posting an Article'
        },
        {
          path: 'assets/scatterschool/scatterschool3.png',
          description: 'Comments on article',
          alt: 'Comments on article'
        }
      ],
      url: 'https://scatterschool.com/',
      blurb: "Scatter School is an open, collaborative knowledge sharing platform. Our focus is on providing makerspaces and hackerspaces with a medium to interact and share their knowledge across the traditional boundaries of a brick-and-mortar hackerspace."
    },
    siteworks: {
      title: 'SiteWorks',
      key: 'siteworks',
      // routerLink: "['/examples/siteworks']",
      images: [
        {
          path: 'assets/siteworks/sitework1.png',
          description: 'Home Page',
          alt: 'Home Page'
        },
        {
          path: 'assets/siteworks/sitework2.png',
          description: 'Product Page',
          alt: 'Product Page'
        },
        {
          path: 'assets/siteworks/sitework3.png',
          description: 'Story Page',
          alt: 'Story Page'
        }
      ],
      blurb: 'This is a beautiful marketing site for one of our earlier clients. You really just need to click below and scroll down the site to get it. Also try clicking the other options in "OUR PRODUCTS" on that site.',
      url: 'https://www.site.work/'
    },
    colormixer: {
      title: 'CSS Color Mixer',
      key: 'colormixer',
      // routerLink: "['/examples/csscolormixer']",
      images: [
        {
          path: 'assets/cssmixer/cssmixer1.png',
          description: 'Home Page',
          alt: 'Home Page'
        },
        {
          path: 'assets/cssmixer/cssmixer2.png',
          description: 'Mixing Colors Page',
          alt: 'Mixing Colors Page'
        },
        {
          path: 'assets/cssmixer/cssmixer3.png',
          description: 'Palette Panel',
          alt: 'Palette Panel'
        }
      ],
      blurb: "This is a silly tool and a powerful toy. It's the brain child of self-education. An assignment one creates for themselves to stretch their math and compress their code. It's fun, and we'll keep on updating it over time just for fun. Really, it should just be messed with so check it out live.",
      url: 'https://csscolormixer.com/'
    }
  };
}
