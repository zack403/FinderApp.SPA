import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'src/app/models/message';
import * as _ from 'underscore';
import { userInfo } from 'os';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input()  userId : number;
messages  : Message[];
newMessage : any = {};


  constructor(private userService : UserService,
    private authService : AuthService, private alertifyService : AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId)
    .do(message => {
      _.each(this.messages, (message : Message) => {
        if(message.isRead === false && message.recipientId === currentUserId){
          this.userService.markAsRead(currentUserId, message.id);
        }
      })
    })
    .subscribe((message : any) => {
      this.messages = message;
    }, error => {
      this.alertifyService.error(error);
    })
  }

  sendMessage(){
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((resp : any) => {
      this.messages.unshift(resp);
      //debugger;
      this.newMessage.content = '';
    }, error => {
      this.alertifyService.error(error);
    })
  }

}
