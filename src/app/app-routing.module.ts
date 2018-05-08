import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ExamplesComponent } from '@components/examples/examples.component';
import { SurveyComponent } from '@components/survey/survey/survey.component';
import { SurveyResultsComponent } from '@components/survey/survey-results/survey-results.component';
import { SurveyDetailComponent } from '@components/survey/survey-detail/survey-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'examples',
    children: [
      { path: ':project', component: ExamplesComponent },
      { path: '', component: ExamplesComponent }
    ]
  },
  { path: 'survey', component: SurveyComponent},
  { path: 'survey-results', component: SurveyResultsComponent},
  { path: 'survey-detail/:id', component: SurveyDetailComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
