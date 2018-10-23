import { AlertifyService } from './../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Pagination } from './../../models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { PaginatedResult } from 'src/app/models/pagination';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages : Message[];
  pagination : Pagination;
  messageContainer = 'Unread';

  constructor(private spinner : NgxSpinnerService,
    private userService : UserService,
    private authService : AuthService,
    private route : ActivatedRoute,
    private alertifyService : AlertifyService) { }

  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide(); 
    }, 1000);

    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((resp: PaginatedResult<Message[]>) => {
      this.messages = resp.result;
      this.pagination = resp.pagination;
    }), error => {
      this.alertifyService.error(error);
    }
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
 }

 deleteMessage(id : number){
   this.alertifyService.confirm("Are you sure you want to delete this message?", () => {
    this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
      this.messages.splice(_.findIndex(this.messages, {id : id}), 1);
      this.alertifyService.success("message successfully deleted");
    }, error => {
      this.alertifyService.error("failed to delete the message");
    })
   })
 }
}
