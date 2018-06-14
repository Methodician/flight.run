import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SurveyService } from '@services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { questions } from '../../../shared/questions';
import { ChartService } from '../chart.service'
import {GoogleCharts} from 'google-charts';
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

//Line Chart
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
      line: {
        color: '#ff5174',
        width: 10
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
      mode: 'lines+markers',
      line: {
        color: '#3f51b5',
        width: 10
      }

    };

    var data = [interest, aptitude ];

    var layout = {
      title: 'Survey Graph'

    };

    var options = {
      displayModeBar: false,
    }


    //Bar CHART
    var trace1 = {
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
  type: 'bar',
  marker: {
    color: '#3f51b5'
  }
};

var trace2 = {
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
  type: 'bar',
  marker: {
    color: '#ff5174'
  }

};

var barData = [trace1, trace2];
var barLayout = {barmode: 'group'};


//PIE CHART #3f51b5 #ff5174
var pmData = survey.ap1 + survey.ap2 + survey.ap3 + survey.ap4 + survey.ap5;
var frontData = survey.ap6 + survey.ap7 + survey.ap8 + survey.ap11 + survey.ap12;
var backData = survey.ap9 + survey.ap10 + survey.ap13 + survey.ap14 + survey.ap15;

var pmInterest = survey.ip1 + survey.ip2 + survey.ip3 + survey.ip4 + survey.ip5;
var frontInterest = survey.ip6 + survey.ip7 + survey.ip8 + survey.ip11 + survey.ip12;
var backInterest = survey.ip9 + survey.ip10 + survey.ip13 + survey.ip14 + survey.ip15;

console.log(pmData);
var pieData = [{
  values: [pmData, frontData, backData],
  labels: ['Project Management', 'Front-End', 'Back-End'],
  type: 'pie',
  marker: {
    colors: ['#ff5174', '#3f51b5', '#212120']
  },
  hole: .5,
  domain: {
    x: [0, .48]
  }
},
{
  values: [pmInterest, frontInterest, backInterest],
  labels: ['Project Management', 'Front-End', 'Back-End'],
  type: 'pie',
  marker: {
    colors: ['#ff5174', '#3f51b5', '#212120']
  },
}];

//Gradient Chart
// var gradient1 = {
//   y: [survey.ip1,
//     survey.ip2,
//     survey.ip3,
//     survey.ip4,
//     survey.ip5,
//     survey.ip6,
//     survey.ip7,
//     survey.ip8,
//     survey.ip9,
//     survey.ip10,
//     survey.ip11,
//     survey.ip12,
//     survey.ip13,
//     survey.ip14,
//     survey.ip15,
//     survey.ip16],
//   mode: 'markers',
//   marker: {
//     size: 40,
//     color:  [survey.ip1,
//       survey.ip2,
//       survey.ip3,
//       survey.ip4,
//       survey.ip5,
//       survey.ip6,
//       survey.ip7,
//       survey.ip8,
//       survey.ip9,
//       survey.ip10,
//       survey.ip11,
//       survey.ip12,
//       survey.ip13,
//       survey.ip14,
//       survey.ip15,
//       survey.ip16]
//   }
// };
//
// var dataGrad = [gradient1];
//
//
// Plotly.newPlot('myGrad', dataGrad, barLayout, options);
//END Gradient

//Gauge CHART

// Enter a speed between 0 and 180
var level = pmInterest;

// Trig to calc meter point
var degrees = 60 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var gaugedata = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'black'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['Super Interested', 'Pretty Interested', 'Interested', 'Average',
            'Not Really Interested', 'Not Interested', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#3f51b5', '#5595fc',
                         '#6ba3ff', '#87b4ff',
                         '#8db7fc', '#97bdfc',
                         'white']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var gaugelayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'black',
      line: {
        color: 'black'
      }
    }],
  title: 'Interest',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};


//End Gauge Chart

//PM Aptitude
var level = pmData;

// Trig to calc meter point
var degrees = 60 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var gaugeAptdata = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'black'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['Well-prepared', 'Pretty Knowledgable', 'Knowledgable', 'Average',
            'Not Knowledgable', 'Underprepared'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#ff5174', '#FF6685',
                         '#FF7994', '#FF8FA6',
                         '#FFBCCA', '#FFE0E6',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var gaugeAptlayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'black',
      line: {
        color: 'black'
      }
    }],
  title: 'Aptitude',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};


//FRONT END GAUGES
//Gauge CHART

// Enter a speed between 0 and 180
var level = frontInterest;

// Trig to calc meter point
var degrees = 60 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var frontgaugedata = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'black'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['Super Interested', 'Pretty Interested', 'Interested', 'Average',
            'Not Really Interested', 'Not Interested', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#3f51b5', '#5595fc',
                         '#6ba3ff', '#87b4ff',
                         '#8db7fc', '#97bdfc',
                         'white']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var frontgaugelayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'black',
      line: {
        color: 'black'
      }
    }],
  title: 'Interest',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};


//End Gauge Chart

//PM Aptitude
var level = frontData;

// Trig to calc meter point
var degrees = 60 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var frontgaugeAptdata = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'black'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['Well-prepared', 'Pretty Knowledgable', 'Knowledgable', 'Average',
            'Not Knowledgable', 'Underprepared'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#ff5174', '#FF6685',
                         '#FF7994', '#FF8FA6',
                         '#FFBCCA', '#FFE0E6',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var frontgaugeAptlayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'black',
      line: {
        color: 'black'
      }
    }],
  title: 'Aptitude',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};
//END FRONT END GAUGES



//BACK END GAUGES
//Gauge CHART

// Enter a speed between 0 and 180
var level = backInterest;

// Trig to calc meter point
var degrees = 60 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var backgaugedata = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'black'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['Super Interested', 'Pretty Interested', 'Interested', 'Average',
            'Not Really Interested', 'Not Interested', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#3f51b5', '#5595fc',
                         '#6ba3ff', '#87b4ff',
                         '#8db7fc', '#97bdfc',
                         'white']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var backgaugelayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'black',
      line: {
        color: 'black'
      }
    }],
  title: 'Interest',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};


//End Gauge Chart

//PM Aptitude
var level = backData;

// Trig to calc meter point
var degrees = 60 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var backgaugeAptdata = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'black'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['Well-prepared', 'Pretty Knowledgable', 'Knowledgable', 'Average',
            'Not Knowledgable', 'Underprepared'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#ff5174', '#FF6685',
                         '#FF7994', '#FF8FA6',
                         '#FFBCCA', '#FFE0E6',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var backgaugeAptlayout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'black',
      line: {
        color: 'black'
      }
    }],
  title: 'Aptitude',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};
//END FRONT END GAUGES
var radarData = [
  {
  type: 'scatterpolar',
  r: [pmInterest, frontInterest, backInterest],
  theta: ['Project Management','Front End','Back End'],
  fill: 'toself',
  fillcolor: '#3f51b5',
  name: 'Interest'
  },
  {
  type: 'scatterpolar',
  r: [pmData, frontData, backData],
  theta: ['Project Management','Front End','Back End'],
  fill: 'toself',
  name: 'Aptitude',
  fillcolor: '#ff5174',

  }
]

var radarLayout = {
  polar: {
    radialaxis: {
      visible: false,
      range: [0, 30]
    }
  }
}


//END PM Aptitude
    Plotly.plot("myRadar", radarData, radarLayout, options);
    Plotly.newPlot('backGauge', backgaugedata, backgaugelayout, options);
    Plotly.newPlot('backApt', backgaugeAptdata, backgaugeAptlayout, options);
    Plotly.newPlot('frontGauge', frontgaugedata, frontgaugelayout, options);
    Plotly.newPlot('frontApt', frontgaugeAptdata, frontgaugeAptlayout, options);
    Plotly.newPlot('myGauge', gaugedata, gaugelayout, options);
    Plotly.newPlot('pmApt', gaugeAptdata, gaugeAptlayout, options);
    Plotly.newPlot('myPie', pieData, barLayout, options);
    Plotly.newPlot('myBar', barData, barLayout, options);
    Plotly.newPlot('myDiv', data, layout, options);
        return newSurveyObject;
      })


      .subscribe(response => {
        this.surveyAnswers = response;
      });

    });




  }



  goBack() {
    this.location.back();
  }

}
