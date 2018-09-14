import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'fly-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  user;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.adminUser$.subscribe((user) =>{

      if(user){
        this.user = user;
      }else {
        this.user = null;
      }
    });
  }

}
