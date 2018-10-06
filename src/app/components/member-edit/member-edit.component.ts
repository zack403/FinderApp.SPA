import { Photo } from './../../models/Photo';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { AlertifyService } from './../../services/alertify.service';
import { User } from './../../models/User';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user : User;
  @ViewChild('editForm')  editForm: NgForm;
  photoUrl : string;

  constructor(private spinner : NgxSpinnerService, 
    private alertifyService: AlertifyService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private authService : AuthService) { }

  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.route.data.subscribe(data => {
        this.user = data['user'];
      });

      this.authService.currentPhotoUrl.subscribe(photourl => {
        this.photoUrl = photourl;
      })

      this.spinner.hide(); 
    }, 1000);
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(() =>{
      this.alertifyService.success("profile successfully updated");
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    }) 
  }

  //third part of an output property
  updateMainPhoto(photoUrl){
    this.user.photoUrl = photoUrl;
  }

}
