import { AuthService } from './../../services/auth.service';
import { AlertifyService } from './../../services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users : User[];
  pagination : Pagination;
  likesParam : string; 

  constructor(private spinner : NgxSpinnerService, 
    private userService : UserService, 
    private alertifyService : AlertifyService,
    private authService : AuthService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].ressult;
      this.pagination = data['users'].pagination;
    })
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide(); 
    }, 1000);

    this.likesParam = 'Likers';
  }

  //pageChanged(event: any): void {
   /// this.pagination.currentPage = event.page;
   //  this.loadUsers();
 //}

  // loadUsers() {
  //   this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
  //   .subscribe((resp : PaginatedResult<User[]>) => {
  //     this.users = resp.result;
  //     this.pagination = resp.pagination;
  //   },
  //   error => {
  //     this.alertifyService.error(error);
  //   });
  // }


}
