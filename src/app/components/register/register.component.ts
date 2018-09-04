import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

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

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  register() {
    this.auth.register(this.model).subscribe(
      () => {
        console.log("Registration successfull");
      },
      error => {
        console.log(error);
      }
    );
  }
  cancel() {
    this.cancelRegisterMode.emit(false);
    console.log("cancelled");
  }
}
