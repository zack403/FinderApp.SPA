import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {}

  login(model: any) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(this.baseUrl + "login", model, { headers: httpheaders })
      .pipe(
        map((response: any) => {
          const user = response;
          if (user && user.tokenString) {
            localStorage.setItem("token", user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            console.log(this.decodedToken);
            this.userToken = user.tokenString;
          }
        }),
        catchError(this.handleError)
      );
  }

  register(model: any) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(this.baseUrl + "register", model, {
        headers: httpheaders
      })
      .pipe(catchError(this.handleError));
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
