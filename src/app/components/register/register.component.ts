import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertifyService } from "../../services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input()
  valuesFromHome: any;
  @Output()
  cancelRegisterMode = new EventEmitter();

  constructor(
    private auth: AuthService,
    private alertservice: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this.auth.register(this.model).subscribe(
      () => {
        this.alertservice.success("Registration successfull");
      },
      error => {
      this.alertservice.error(error);
      }
    );
  }
  cancel() {
    this.cancelRegisterMode.emit(false);
  }
}
