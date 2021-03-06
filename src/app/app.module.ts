import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { environment } from '@environments/environment';

//  Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from '@components/nav-menu/nav-menu.component';
import { CarouselFrameComponent } from '@components/carousel/carousel-frame/carousel-frame.component';
import { CarouselItemBlogPostComponent } from '@components/carousel/carousel-item-blog-post/carousel-item-blog-post.component';
import { CarouselItemCaseStudyComponent } from '@components/carousel/carousel-item-case-study/carousel-item-case-study.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

//  Directives
import { ClickOutsideDirective } from '@directives/click-outside.directive';

//  Services
import { MediaQueryService } from '@services/media-query.service';
import { ContactService } from '@services/contact.service';
import { HomeComponent } from '@components/home/home.component';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { ExamplesComponent } from '@components/examples/examples.component';
import { KeysPipe } from './shared/pipes/keys.pipe';
import { TruncateStringPipe } from './shared/pipes/truncate-string.pipe';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';

// Import Material and Carousel
import { MaterialModule } from './material.module';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselTestimonialComponent } from '@components/carousel-testimonial/carousel-testimonial.component';
import { SurveyComponent } from '@components/survey/survey/survey.component';
import { SurveyFormComponent } from '@components/survey/survey-form/survey-form.component';
import { SurveyService } from '@services/survey.service';
import { SurveyResultsComponent } from '@components/survey/survey-results/survey-results.component';
import { SurveyDetailComponent } from '@components/survey/survey-detail/survey-detail.component';

// Import Core Admin UserAuth
import { AuthGuard } from '@services/auth.guard';
import { AuthService } from '@services/auth.service';
import { NotifyService } from '@services/notify.service';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { GoogleSiteVerificationComponent } from '@components/google-site-verification/google-site-verification.component';
import { BlogListComponent } from '@components/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from '@components/blog/blog-detail/blog-detail.component';
import { BlogPreviewCardComponent } from '@components/blog/blog-preview-card/blog-preview-card.component';
import { BlogService } from '@services/blog.service';

import { CaseService } from '@services/case.service';
import { FooterComponent } from '@components/footer/footer.component';
import { RelatedPostsComponent } from '@components/blog/related-posts/related-posts.component';
import { CaseListComponent } from '@components/case-studies/case-list/case-list.component';
import { CaseDetailComponent } from '@components/case-studies/case-detail/case-detail.component';
import { CasePreviewComponent } from '@components/case-studies/case-preview/case-preview.component';
import { CarouselItemSupportingImageComponent } from '@components/carousel/carousel-item-supporting-image/carousel-item-supporting-image.component';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';
import { CommentService } from '@services/comment.service';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FeaturedComponent } from './components/admin/featured/featured.component';
import { FeaturedService } from './services/featured.service';
import { AdminGuard } from './services/admin.guard';

//  Import Firebase stuff
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ClickOutsideDirective,
    HomeComponent,
    ContactFormComponent,
    ExamplesComponent,
    KeysPipe,
    TruncateStringPipe,
    SafeHtmlPipe,
    CarouselFrameComponent,
    CarouselItemBlogPostComponent,
    CarouselTestimonialComponent,
    CarouselItemCaseStudyComponent,
    SurveyComponent,
    SurveyFormComponent,
    SurveyResultsComponent,
    SurveyDetailComponent,
    LoginComponent,
    RegisterComponent,
    GoogleSiteVerificationComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogPreviewCardComponent,
    FooterComponent,
    RelatedPostsComponent,
    CaseListComponent,
    CaseDetailComponent,
    CasePreviewComponent,
    CarouselItemSupportingImageComponent,
    CommentListComponent,
    CommentComponent,
    CommentFormComponent,
    AdminHomeComponent,
    FeaturedComponent,
    ImageGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    NguCarouselModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  providers: [
    MediaQueryService,
    ContactService,
    SurveyService,
    BlogService,
    CaseService,
    NotifyService,
    CommentService,
    FeaturedService,
    AngularFireAuth,
    AuthService,
    AdminGuard,
    AuthGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(afs: AngularFirestore) {
    const fsSettings = { timestampsInSnapshots: true };
    afs.firestore.settings(fsSettings);
  }

 }
