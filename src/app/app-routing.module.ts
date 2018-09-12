import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ExamplesComponent } from '@components/examples/examples.component';
import { SurveyComponent } from '@components/survey/survey/survey.component';
import { SurveyResultsComponent } from '@components/survey/survey-results/survey-results.component';
import { SurveyDetailComponent } from '@components/survey/survey-detail/survey-detail.component';
import { AuthGuard } from '@services/auth.guard';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { GoogleSiteVerificationComponent } from '@components/google-site-verification/google-site-verification.component';
import { BlogListComponent } from '@components/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from '@components/blog/blog-detail/blog-detail.component';
import { CaseListComponent } from '@components/case-studies/case-list/case-list.component';
import { CaseDetailComponent } from '@components/case-studies/case-detail/case-detail.component';
import { AdminHomeComponent } from '@components/admin/admin-home/admin-home.component';
import { FeaturedComponent } from '@components/admin/featured/featured.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'examples',
    children: [
      { path: ':project', component: ExamplesComponent },
      { path: '', component: ExamplesComponent }
    ]
  },
  { path: 'admin', component: AdminHomeComponent},
  { path: 'admin/:featuredType', component: FeaturedComponent},
  { path: 'admin', component: AdminHomeComponent}
  { path: 'survey', component: SurveyComponent },
  { path: 'survey-results', canActivate: [AuthGuard], component: SurveyResultsComponent },
  { path: 'survey-detail/:id', canActivate: [AuthGuard], component: SurveyDetailComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/post/:slug', component: BlogDetailComponent },
  { path: 'blog/category/:slug', component: BlogListComponent },
  { path: 'case-studies', component: CaseListComponent },
  { path: 'case-studies/:slug', component: CaseDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'google2de060c65021d3bf.html', component: GoogleSiteVerificationComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
