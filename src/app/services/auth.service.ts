import { User } from './../models/User';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import {  JwtHelper } from "angular2-jwt";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currentUser : User;
  jwtHelper: JwtHelper = new JwtHelper();
  private photoUrl = new BehaviorSubject<string>("assets/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();
  serverMessage : string;

  constructor(private http: HttpClient, private jwtHelperService : JwtHelperService) {}

  changeMemberPhoto(photoUrl : string){
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.baseUrl + "auth/login", model, { headers: httpheaders })
      .pipe(map((response: any) => {
          const user = response;
          this.serverMessage = user.message;
          if (user && user.tokenString) {
            localStorage.setItem("token", user.tokenString);
            localStorage.setItem("user", JSON.stringify(user.user));
            this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
            this.currentUser = user.user;
            this.userToken = user.tokenString;
            if(this.currentUser.photoUrl != null){
              this.changeMemberPhoto(this.currentUser.photoUrl);
            }else{
              this.changeMemberPhoto("assets/user.png");
            }
          }
        }));
  }

  register(user: User) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.baseUrl + "auth/register", user, {headers: httpheaders});
  }

  loggedIn() {
    const token =  this.jwtHelperService.tokenGetter();
    if(!token){
      return false;
    }
    return !this.jwtHelperService.isTokenExpired();

  }

}
