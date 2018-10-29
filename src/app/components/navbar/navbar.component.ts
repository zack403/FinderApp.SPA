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
  photoUrl : string;

  constructor(
    public authservice: AuthService,
    private alertservice: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(photourl => {
      this.photoUrl = photourl;
    })
  }

  login() {
    this.authservice.login(this.model).subscribe(
      data => {
        this.alertservice.success("Logged in successsfully");
        this.router.navigate(["/members"]);
      },
      error => {
        this.alertservice.error(error);
      }
    );
  }

  logout() {
    this.authservice.userToken = null;
    this.authservice.currentUser = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.alertservice.message("Logged out");
    this.router.navigate(["/home"]);
  }
  loggedIn() {
    return this.authservice.loggedIn();
  }
}
