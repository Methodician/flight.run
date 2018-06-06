import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
    // CommonModule
  ],
  declarations: [],
  providers: [AuthService, AdminGuard]
})
export class CoreModule { }
