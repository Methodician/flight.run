import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { questions } from '../../../shared/questions';

import { ChartService } from '@services/chart.service';

@Component({
  selector: 'fly-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {
data = [ ];

layout = {


  };

options = {
    displayModeBar: false,
  }
  surveyAnswers: any;
  @ViewChild('chart') chartEl: ElementRef;

  surveyQuestions: any;

  constructor(
    private surveySvc: SurveyService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.surveyQuestions = questions;

    this.route.params.subscribe(params => {
      this.surveySvc
      .getSurveyDetail(params.id)
      .valueChanges()
      .map((survey: any) => {
        const surveyContact = {
          firstName: survey.firstName,
          lastName: survey.lastName,
          email: survey.email,
          cohort: survey.cohort,
          timestamp: survey.timestamp
        }
        const frAnswers = {
          0: survey.fr1,
          1: survey.fr2,
          2: survey.fr3,
          3: survey.fr4,
          4: survey.fr5,
          5: survey.fr6
        }
        const aipAnswers = {
          0: {
            i: survey.ip1,
            a: survey.ap1
          },
          1: {
            i: survey.ip2,
            a: survey.ap2
          },
          2: {
            i: survey.ip3,
            a: survey.ap3
          },
          3: {
            i: survey.ip4,
            a: survey.ap4
          },
          4: {
            i: survey.ip5,
            a: survey.ap5
          },
          5: {
            i: survey.ip6,
            a: survey.ap6
          },
          6: {
            i: survey.ip7,
            a: survey.ap7
          },
          7: {
            i: survey.ip8,
            a: survey.ap8
          },
          8: {
            i: survey.ip9,
            a: survey.ap9
          },
          9: {
            i: survey.ip10,
            a: survey.ap10
          },
          10: {
            i: survey.ip11,
            a: survey.ap11
          },
          11: {
            i: survey.ip12,
            a: survey.ap12
          },
          12: {
            i: survey.ip13,
            a: survey.ap13
          },
          13: {
            i: survey.ip14,
            a: survey.ap14
          },
          14: {
            i: survey.ip15,
            a: survey.ap15
          },
          15: {
            i: survey.ip16,
            a: survey.ap16
          }
        }
        const newSurveyObject = {
          contact: surveyContact,
          fr: frAnswers,
          aip: aipAnswers
        }

//Charts
var interest = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  y: [survey.ip1,
    survey.ip2,
    survey.ip3,
    survey.ip4,
    survey.ip5,
    survey.ip6,
    survey.ip7,
    survey.ip8,
    survey.ip9,
    survey.ip10,
    survey.ip11,
    survey.ip12,
    survey.ip13,
    survey.ip14,
    survey.ip15,
    survey.ip16],
  name: 'Interest',
  mode: 'lines+markers',
  text:  ['Interactions with stakeholders (talking with people like customers, supervisors, planners, and co-workers and understanding/interpreting their needs)', '	Staying organized and keeping track of lots of different requirements and tasks in an orderly manner', 'Understanding, and clearly defining requirements for a project (and helping team members understand)', '	Working with project management tools and organizational tools (like trello, calendar tools, Jira, time trackers, etc…)', 'Working with GIT or other source control tools','Envisioning user experience and the UX workflow','Creating visually aesthetic designs given the constraints of project requirements','Envisioning, and designing user interface','	Solving logical problems with functions and code', 'Solving mathematical problems with functions and code', '	Translating visual design specs into code with HTML/CSS', '	Creating animations and transitions with HTML/CSS, JavaScript, or tools like Angular Animations', '	Understanding and designing data structures for storage and retrieval of the data that ultimately drives a web application', '	Writing raw SQL', 'Working with relational data structures (like tables and spreadsheets in rows/columns/cells)', '	Working with tree-like data structures (like JSON and NoSQL solutions, Firebase, MongoDB, etc...)'],

  line: {
    color: '#ff5174',
    width: 10
  },

  hoverlabel: {
    font: {color: 'white'}
  }

};

var aptitude = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  y: [survey.ap1,
    survey.ap2,
    survey.ap3,
    survey.ap4,
    survey.ap5,
    survey.ap6,
    survey.ap7,
    survey.ap8,
    survey.ap9,
    survey.ap10,
    survey.ap11,
    survey.ap12,
    survey.ap13,
    survey.ap14,
    survey.ap15,
    survey.ap16],
  name: 'Aptitude',
  mode: 'lines',
  line: {
    color: '#3f51b5',
    width: 10,
  },



};

this.data = [interest, aptitude];

// var layout = {
//
//
// };
//
// var options = {
//   displayModeBar: false,
// }
          var pmData = survey.ap1 + survey.ap2 + survey.ap3 + survey.ap4 + survey.ap5;
          var frontData = survey.ap6 + survey.ap7 + survey.ap8 + survey.ap11 + survey.ap12;
          var backData = survey.ap9 + survey.ap10 + survey.ap13 + survey.ap14 + survey.ap15;

          var pmInterest = survey.ip1 + survey.ip2 + survey.ip3 + survey.ip4 + survey.ip5;
          var frontInterest = survey.ip6 + survey.ip7 + survey.ip8 + survey.ip11 + survey.ip12;
          var backInterest = survey.ip9 + survey.ip10 + survey.ip13 + survey.ip14 + survey.ip15;




        return newSurveyObject;
      })
      .subscribe(response => {
        this.surveyAnswers = response;

        if( this.surveyAnswers){
        Plotly.newPlot('myDiv', this.data, this.layout, this.options);
      }
      });
    });
  }

  goBack() {
    this.location.back();
  }

}
