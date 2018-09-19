import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {};

  constructor(
    private spinner : NgxSpinnerService,
    private authservice: AuthService,
    private alertservice: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
  }

    

  login() {
    this.authservice.login(this.model).subscribe(
      data => {
        this.alertservice.success("logged in successsfully");
        this.router.navigate(["/members"]);
      },
      error => {
        this.alertservice.error(error);
      }
    );
  }
  loggedIn() {
    return this.authservice.loggedIn();
  }



}
