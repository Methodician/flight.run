import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { questions } from '../../../shared/questions';
import { ChartService } from '../chart.service'
import * as _ from 'lodash'

@Component({
  selector: 'fly-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {
@ViewChild('chart') chartEl: ElementRef;

  surveyAnswers: any;
  surveyQuestions: any;
  pmRank: number;

//CHART


  constructor(
    private surveySvc: SurveyService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    this.surveyQuestions = questions;
    this.pmRank = 0;
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


    var interest = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 10],
      name: 'Interest',
      mode: 'lines+markers'
    };

    var aptitude = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      name: 'Aptitude',
      mode: 'lines+markers'
    };

    var data = [interest, aptitude ];

    var layout = {};

    Plotly.newPlot('myDiv', data, layout);
        return newSurveyObject;
      })


      .subscribe(response => {
        this.surveyAnswers = response;
      });

    });




  }

  surveyRank() {
    if(this.surveyAnswers.aipAnswers.ap1 >= 3) {
      this.pmRank + 1;

    }
  }

  goBack() {
    this.location.back();
  }

}
