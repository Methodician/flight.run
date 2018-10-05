import { Component, OnInit } from '@angular/core';
import { SurveyService, SurvyEnum } from '@services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { questions } from '@shared/questions';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'fly-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {
  surveyAnswers: any;
  surveyQuestions: any;
  graph = {
    data: [],
    layout: {
      width: window.innerWidth * 0.9,
      height: 500,
      title: 'A Fancy Plot',
      dragmode: 'pan'
    }
  };

  constructor(
    private surveySvc: SurveyService,
    private route: ActivatedRoute,
    private location: Location,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    window.onresize = (ev) => {
      const graphWidth = ((ev.currentTarget as any).innerWidth) * 0.9;
      this.graph.layout.width = graphWidth;
    };

    this.surveyQuestions = questions;

    this.route.params.subscribe(params => {
      this.surveySvc
        .getSurveyDetail(SurvyEnum.internshipSurveys, params.id)
        .valueChanges()
        .map((survey: any) => {
          console.log('SURVEY', survey);
          const surveyContact = {
            firstName: survey.firstName,
            lastName: survey.lastName,
            email: survey.email,
            cohort: survey.cohort,
            timestamp: survey.timestamp
          };
          const frAnswers = {
            0: survey.fr1,
            1: survey.fr2,
            2: survey.fr3,
            3: survey.fr4,
            4: survey.fr5,
            5: survey.fr6
          };
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
          };
          const newSurveyObject = {
            contact: surveyContact,
            fr: frAnswers,
            aip: aipAnswers
          };
          return newSurveyObject;
        })
        .subscribe(response => {
          this.surveyAnswers = response;
          this.setupChart();
        });
    });
  }

  setupChart() {
    let xAxis = [];
    let aYaxis = [];
    let iYaxis = [];
    let qText = [];
    for (let index in this.surveyAnswers.aip) {
      let xIndex = Number(index) + 1;
      console.log(this.surveyAnswers.aip[index]);
      aYaxis[index] = this.surveyAnswers.aip[index].a;
      iYaxis[index] = this.surveyAnswers.aip[index].i;
      xAxis[index] = xIndex;
      qText[index] = questions.aip[index];
    }
    this.graph.data = [
      { x: xAxis, y: aYaxis, type: 'scatter', mode: 'lines+markers', name: 'Aptitude', text: qText, marker: { color: 'green' } },
      { x: xAxis, y: iYaxis, type: 'scatter', mode: 'lines+markers', name: 'Interest', text: qText, marker: { color: 'blue' } }
    ]
    console.log(this.graph.data);
  }

  goBack() {
    this.location.back();
  }
  logOut() {
    console.log('logout clicked'); // REMOVE
    this.authSvc.signOut();
  }
}
