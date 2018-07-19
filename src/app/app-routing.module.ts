import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ExamplesComponent } from '@components/examples/examples.component';
import { SurveyComponent } from '@components/onboarding-survey/survey/survey.component';
import { SurveyResultsComponent } from '@components/onboarding-survey/survey-results/survey-results.component';
import { SurveyDetailComponent } from '@components/onboarding-survey/survey-detail/survey-detail.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyGeneratorComponent } from './components/follow-up-survey/survey-generator/survey-generator.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'examples',
    children: [
      { path: ':project', component: ExamplesComponent },
      { path: '', component: ExamplesComponent }
    ]
  },
  { path: 'survey', component: SurveyComponent },
  { path: 'follow-up-survey', component: SurveyGeneratorComponent},
  { path: 'survey-results', canActivate: [AuthGuard], component: SurveyResultsComponent },
  { path: 'survey-detail/:id', canActivate: [AuthGuard], component: SurveyDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
