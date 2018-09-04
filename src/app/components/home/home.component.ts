import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  values;
  private url = "http://localhost:5000/api/value";
  registerMode = false;
  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {
  
  }

  registerToggle() {
    this.registerMode = true;
  }

  opendialog() {
    this.dialog.open(RegisterComponent);
  }

  cancelRegisterMode(registermode: boolean) {
    this.registerMode = registermode;
  }
}
