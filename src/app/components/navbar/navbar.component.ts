import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(private authservice: AuthService) {}

  ngOnInit() {}

  login() {
    this.authservice.login(this.model).subscribe(
      data => {
        console.log("logged in successsfully");
      },
      error => {
        console.log("failed to login");
      }
    );
  }

  logout() {
    this.authservice.userToken = null;
    localStorage.removeItem("token");
    console.log("logged out");
  }
  loggedIn() {
    let token = localStorage.getItem("token");
    return !!token;
  }
}
