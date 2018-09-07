import { JwtHelper } from "angular2-jwt";
import { AuthService } from "./services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Finder app";
  jwthelper: JwtHelper = new JwtHelper();
  constructor(private authservice: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authservice.decodedToken = this.jwthelper.decodeToken(token);
    }
  }
}
