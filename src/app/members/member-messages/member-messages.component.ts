import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {tap} from "rxjs/operators";
import { Message } from 'src/app/models/message';
import * as _ from 'underscore';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input()  userId : number;
messages  : Message[];
newMessage : any = {};
isBusy = false;


  constructor(private userService : UserService,
    private authService : AuthService, private alertifyService : AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId)
    .pipe(tap(messages => {
      _.each(messages, (message : Message) => {
        if(message.isRead === false && message.recipientId === currentUserId){
          this.userService.markAsRead(currentUserId, message.id);
        }
      })
    }))
    .subscribe(message  => {
      this.messages = message;
    }, error => {
      this.alertifyService.error(error);
    })
  }

  sendMessage(){
    this.isBusy = true;
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(resp   => {
      this.messages.unshift(resp);
      this.isBusy = false;
      //debugger;
      this.newMessage.content = '';
    }, error => {
      this.alertifyService.error(error);
      this.isBusy = false;
    })
  }

}
