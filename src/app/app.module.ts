import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '@environments/environment';

//  Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from '@components/nav-menu/nav-menu.component';

//  Directives
import { ClickOutsideDirective } from '@directives/click-outside.directive';

//  Services
import { MediaQueryService } from '@services/media-query.service';
import { ContactService } from '@services/contact.service';
import { HomeComponent } from './components/home/home.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { KeysPipe } from './shared/pipes/keys.pipe';

// Import Material and Carousel
import { MaterialModule } from './material.module';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselTestimonialComponent } from './components/carousel-testimonial/carousel-testimonial.component';
import { SurveyComponent } from './components/survey/survey/survey.component';
import { SurveyFormComponent } from './components/survey/survey-form/survey-form.component';
import { SurveyService } from '@services/survey.service';
import { SurveyResultsComponent } from './components/survey/survey-results/survey-results.component';

 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ClickOutsideDirective,
    HomeComponent,
    ContactFormComponent,
    ExamplesComponent,
    KeysPipe,
    CarouselComponent,
    CarouselTestimonialComponent,
    SurveyComponent,
    SurveyFormComponent,
    SurveyResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    NguCarouselModule
  ],
  providers: [
    MediaQueryService,
    ContactService,
    SurveyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
