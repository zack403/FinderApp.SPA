import { AlertifyService } from "./../../services/alertify.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(
    private authservice: AuthService,
    private alertservice: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authservice.login(this.model).subscribe(
      data => {
        this.alertservice.success("logged in successsfully");
        this.router.navigate(["/members"]);
      },
      error => {
        this.alertservice.error("Failed to login");
      }
    );
  }

  logout() {
    this.authservice.userToken = null;
    localStorage.removeItem("token");
    this.alertservice.message("logged out");
    this.router.navigate(["/home"]);
  }
  loggedIn() {
    return this.authservice.loggedIn();
  }
}
