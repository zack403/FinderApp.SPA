import { AuthService } from './../../services/auth.service';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  values;
  private url = "http://localhost:5000/api/value";
  registerMode = false;
  constructor(private dialog: MatDialog, 
    private spinner : NgxSpinnerService,  
    private http: HttpClient, private authService : AuthService) {}


  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide(); 
    }, 1000);
  }

  registerToggle() {
    this.registerMode = true;
  }

  opendialog() {
    this.dialog.open(RegisterComponent);
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  cancelRegisterMode(registermode: boolean) {
    this.registerMode = registermode;
  }
}
