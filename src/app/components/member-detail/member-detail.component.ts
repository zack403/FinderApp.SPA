import { AuthService } from './../../services/auth.service';
import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { MatTab, MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
@ViewChild('memberTabs') memberTabs : MatTabGroup
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

  constructor(private userService : UserService, private authService : AuthService, private alertifyService : AlertifyService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      let selectedTab = params['tab'];
      this.memberTabs._tabs[selectedTab ? selectedTab : 0].active = true;
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

    selectedTab(tabId : number){
     this.memberTabs._tabs[tabId].active = true;
    }
  loadUser(){
this.userService.getUser(+this.route.snapshot.params['id']).subscribe(response => {
  this.user = response;
}, error => {
  this.alertifyService.error(error);
})
  }

loggedIn() {
  return this.authService.loggedIn();
}

}
