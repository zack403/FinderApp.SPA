import { AuthService } from './../../services/auth.service';
import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
selectedIndex:number=0;


  constructor(private userService : UserService, private authService : AuthService, private alertifyService : AlertifyService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    
    
     this.loadUser();
    this.galleryOptions = [
      {
        width : '500px',
        height : '500px',
        imagePercent : 100,
        thumbnailsColumns : 4,
        imageAnimation : NgxGalleryAnimation.Slide,
        preview : false

      }
    ];
     this.galleryImages = this.getImages();
  }
  getImages(){
    const imagesUrl = [];
    for (let i = 0; i < this.user.photos.length; i++){
      imagesUrl.push({
        small : this.user.photos[i].url,
        medium : this.user.photos[i].url,
        big : this.user.photos[i].url,
        description : this.user.photos[i].description
      });
    }
    return imagesUrl;
  }

  gotToMessageTab(){
    this.selectedIndex=3;
  }

 

  loadUser(){
  this.userService.getUser(+this.route.snapshot.params['id']).subscribe(response => {
  this.user = response;
  }, error => {
  this.alertifyService.error(error);
 })
  }

  sendLike(id : number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(response => {
      this.alertifyService.success(`You have liked ${this.user.knownAs}`);
    }, error => {
      this.alertifyService.error(error);
    });
  }

loggedIn() {
  return this.authService.loggedIn();
}

}
