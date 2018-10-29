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
  isBusy = false;
  constructor(
    private spinner : NgxSpinnerService,
    private authservice: AuthService,
    private alertservice: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide(); 
    }, 1000);
  }

    

  login() {
    this.isBusy = true;
    this.authservice.login(this.model).subscribe(data => {
      this.isBusy = false;
        this.alertservice.success(this.authservice.serverMessage);
        this.router.navigate(["/members"]);
      }, error => {
        this.isBusy = false;
        this.alertservice.error(error);
      }
    );
  }
  loggedIn() {
    return this.authservice.loggedIn();
  }



}
