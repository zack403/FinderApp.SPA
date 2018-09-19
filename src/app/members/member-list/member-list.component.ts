import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../models/User";
import { AlertifyService } from "../../services/alertify.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {

  users : User[];
  constructor(private userService: UserService, private alertifyService : AlertifyService, private spinner : NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.loadUsers();
      this.spinner.hide(); 
    }, 2000);
  }

  loadUsers() {
    this.userService.getUsers().subscribe(resp => {
      this.users = resp;
    },
    error => {
      this.alertifyService.error(error);
    });
  }
}
