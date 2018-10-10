import { EventEmitter } from '@angular/core';
import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Photo } from '../../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from './../../environments/environment';
import { UserService } from '../../services/user.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos : Photo[];
  uploader : FileUploader; 
  hasBaseDropZoneOver : false;
  baseUrl : environment.apiUrl;
  currentMain : Photo;
   
  //always four part to an output property : two in the child component and d other two in the parent componnet
  //first part of an output property
  @Output() getMemberPhotoChange = new EventEmitter<string>();


  public fileOverBase(e:any) : void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(private authService: AuthService, private userService : UserService, private alertifyService : AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
   }

  initializeUploader(){
    this.uploader =  new FileUploader({

      url: this.baseUrl + "user/" + this.authService.decodedToken.nameid + "/photos",
      authToken : 'Bearer ' + localStorage.getItem("token"),
      isHTML5 : true,
      allowedFileType: ["image"],
      removeAfterUpload : true,
      autoUpload : false,
      maxFileSize : 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers ) => {
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id : res.id,
          url : res.url,
          dateAdded : res.dateAdded,
          description : res.description,
          isMain : res.isMain
        }
        this.photos.push(photo);
        if(photo.isMain){
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem("user", JSON.stringify(this.authService.currentUser))
        }
      };

    }
  }

    deletePhoto(id : number){
      this.alertifyService.confirm("Are You sure you want to Delete this photo?", () => {
        this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
          this.photos.splice(_.findIndex(this.photos, {id : id}, 1));
          this.alertifyService.success("photo successfully deleted");
        }, error => {
          this.alertifyService.error("failed to delete photo");
        } )
      });
    }

    setMainPhoto(photo : Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.currentMain = _.findWhere(this.photos, {isMain : true});
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem("user", JSON.stringify(this.authService.currentUser))
      //second part of an output property
      //this.getMemberPhotoChange.emit(photo.url);
    }, error => {
      this.alertifyService.error(error);
    })
  }

}
