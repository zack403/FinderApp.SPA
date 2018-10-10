import { JwtHelper } from "angular2-jwt";
import { AuthService } from "./services/auth.service";
import { Component, OnInit } from "@angular/core";
import { User } from "./models/User";

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
    const user : User = JSON.parse(localStorage.getItem("user"));
    if (token) {
      this.authservice.decodedToken = this.jwthelper.decodeToken(token);
    }
    if(user){
      this.authservice.currentUser = user;
      if(this.authservice.currentUser.photoUrl != null) {
        this.authservice.changeMemberPhoto(user.photoUrl);
      }else{
        this.authservice.changeMemberPhoto("assets/user.png");
      }
    }
  }
}


// a supply chain helps to track each party end to end



