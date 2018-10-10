import { User } from './../models/User';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;
  decodedToken: any;
  currentUser : User;
  jwtHelper: JwtHelper = new JwtHelper();
  private photoUrl = new BehaviorSubject<string>("assets/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl : string){
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(this.baseUrl + "login", model, { headers: httpheaders })
      .pipe(
        map((response: any) => {
          const user = response;
          if (user && user.tokenString) {
            localStorage.setItem("token", user.tokenString);
            localStorage.setItem("user", JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.currentUser = user.user;
            this.userToken = user.tokenString;
            if(this.currentUser.photoUrl != null){
              this.changeMemberPhoto(this.currentUser.photoUrl);
            }else{
              this.changeMemberPhoto("assets/user.png");
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  register(user: User) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.baseUrl + "register", user, {headers: httpheaders}).pipe(catchError(this.handleError));
  }

  loggedIn() {
    return tokenNotExpired("token");
  }

  private handleError(error: any) {
    const applicationerror = error.headers.get("Application-Error");
    if (applicationerror) {
      return throwError(applicationerror);
    }
    const servererror = error;
    let modelStatErrors = "";
    if (servererror) {
      for (const key in servererror) {
        if (servererror[key]) {
          modelStatErrors += servererror[key] + "\n";
        }
      }
    }
    return throwError(modelStatErrors || "servererror");
  }
}
