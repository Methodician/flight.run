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
          path: 'assets/BIM/BIM_v1_boundary_selected.jpg',
          description: 'I\'m an image',
          alt: 'What you are seeing'
        },
        {
          path: 'assets/BIM/BIM_v1_content_example.jpg',
          description: 'This was epic',
          alt: 'Just go home'
        }
      ],
      blurb: 'We did this thing. It was awesome. Mappers can map stuff and other mappers can see it right away. Mappers can zap the map and add data to boundaries. They\'re colorful like stained glass. It was great until the great flood came and demapped our zaps.'
    },
    scatterschool: {
      title: 'Scatter School',
      key: 'scatterschool',
      images: [
        {
          path: 'assets/BIM/BIM_v1_boundary_selected.jpg',
          description: 'I\'m an image',
          alt: 'What you are seeing'
        },
        {
          path: 'assets/BIM/BIM_v1_content_example.jpg',
          description: 'This was epic',
          alt: 'Just go home'
        }
      ],
      blurb: 'We did this thing. It was awesome. Mappers can map stuff and other mappers can see it right away. Mappers can zap the map and add data to boundaries. They\'re colorful like stained glass. It was great until the great flood came and demapped our zaps.'
    },
    communitywarehouse: {
      title: 'Community Warehouse',
      key: 'communitywarehouse',
      images: [
        {
          path: 'assets/BIM/BIM_v1_boundary_selected.jpg',
          description: 'I\'m an image',
          alt: 'What you are seeing'
        },
        {
          path: 'assets/BIM/BIM_v1_content_example.jpg',
          description: 'This was epic',
          alt: 'Just go home'
        }
      ],
      blurb: 'We did this thing. It was awesome. Mappers can map stuff and other mappers can see it right away. Mappers can zap the map and add data to boundaries. They\'re colorful like stained glass. It was great until the great flood came and demapped our zaps.'
    },
    campattendent: {
      title: 'Camp Attendent',
      key: 'campattendent',
      images: [
        {
          path: 'assets/BIM/BIM_v1_boundary_selected.jpg',
          description: 'I\'m an image',
          alt: 'What you are seeing'
        },
        {
          path: 'assets/BIM/BIM_v1_content_example.jpg',
          description: 'This was epic',
          alt: 'Just go home'
        }
      ],
      blurb: 'We did this thing. It was awesome. Mappers can map stuff and other mappers can see it right away. Mappers can zap the map and add data to boundaries. They\'re colorful like stained glass. It was great until the great flood came and demapped our zaps.'
    },
    colormixer: {
      title: 'CSS Color Mixer',
      key: 'colormixer',
      images: [
        {
          path: 'assets/BIM/BIM_v1_boundary_selected.jpg',
          description: 'I\'m an image',
          alt: 'What you are seeing'
        },
        {
          path: 'assets/BIM/BIM_v1_content_example.jpg',
          description: 'This was epic',
          alt: 'Just go home'
        }
      ],
      blurb: 'We did this thing. It was awesome. Mappers can map stuff and other mappers can see it right away. Mappers can zap the map and add data to boundaries. They\'re colorful like stained glass. It was great until the great flood came and demapped our zaps.'
    }
  };
}
