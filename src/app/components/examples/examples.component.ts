import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fly-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  projectKey: string = 'bimearth';
  selectedProject: any;
  selectedImage: any;



  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
  }

  selectImage(index) {
    this.selectedImage = this.selectedProject.images[index];
  }

  projects = {
    bimearth: {
      title: 'BIM Earth',
      key: 'bimearth',
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
          description: 'Logged-in User',
          alt: 'Logged-in User'
        }
      ],
      blurb: 'BIM Earth makes associating geographical boundaries with data, easy, intuitive and practical. By making boundaries on the map, you can make them public, personal or private. You can upload files, videos, pictures and blog post to the boundaries to refer to later or share with your friends! '
    },
    scatterschool: {
      title: 'Scatter School',
      key: 'scatterschool',
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
          description: 'Comment Section',
          alt: 'Comment Section'
        }
      ],
      blurb: 'Scatter School is an online hub for people who love making things can share their knowledge with people everywhere. Community made open, editable tutorials for everyone.'
    },
    siteworks: {
      title: 'SiteWorks',
      key: 'siteworks',
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
      blurb: 'Jacob this one is all you im fried LOL'
    },
    colormixer: {
      title: 'CSS Color Mixer',
      key: 'colormixer',
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
          description: 'Pallette Panel',
          alt: 'Pallette Panel'
        }
      ],
      blurb: 'Jacob this one is all you im fried LOL'
    }
  };
}
