import { AlertifyService } from "./../../services/alertify.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(
    private authservice: AuthService,
    private alertservice: AlertifyService
  ) {}

  ngOnInit() {}

  login() {
    this.authservice.login(this.model).subscribe(
      data => {
        this.alertservice.success("logged in successsfully");
      },
      error => {
        this.alertservice.error(error);
      }
    );
  }

  logout() {
    this.authservice.userToken = null;
    localStorage.removeItem("token");
    this.alertservice.message("logged out");
  }
  loggedIn() {
    return this.authservice.loggedIn();
  }
}
