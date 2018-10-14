import { PaginatedResult } from './../../models/pagination';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../models/User";
import { AlertifyService } from "../../services/alertify.service";
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users : User[];
  pagination : Pagination;
  user : User =  JSON.parse(localStorage.getItem("user"));
  genderList = [{value :"male", display: "Males"}, {value : "female", display : "Females"}];
  userParams : any = {};


  constructor(private userService: UserService, 
    private route : ActivatedRoute, 
    private alertifyService : AlertifyService, 
    private spinner : NgxSpinnerService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
      // this.pagination = data['users'].pagination;
    })


    this.userParams.gender = this.user.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
     //this.loadUsers();
    // this.spinner.show(); 
    // setTimeout(() => {
    //   this.loadUsers();
    //   this.spinner.hide(); 
    // }, 1000);
  }

  pageChanged(event: any): void {
     this.pagination.currentPage = event.page;
    //  this.loadUsers();
  }


  resetFilters () {
    this.userParams.gender = this.user.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    //this.loadUsers():
  }
  // loadUsers() {
  //   this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
  //   .subscribe((resp : PaginatedResult<User[]>) => {
  //     this.users = resp.result;
  //     this.pagination = resp.pagination;
  //   },
  //   error => {
  //     this.alertifyService.error(error);
  //   });
  // }
}
