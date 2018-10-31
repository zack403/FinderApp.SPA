import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertifyService } from './../../services/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user : User;

constructor(private spinner : NgxSpinnerService, 
  private authService : AuthService, 
  private alertifyService : AlertifyService, 
  private userService  : UserService, private route : Router) { }

ngOnInit() {
  this.spinner.show(); 
  setTimeout(() => {
    this.spinner.hide(); 
  }, 1000);
}



  sendLike(id : number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(response => {
      this.alertifyService.success(`You have liked ${this.user.knownAs}`);
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
