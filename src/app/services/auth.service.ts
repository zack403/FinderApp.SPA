import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(this.baseUrl + "login", model, { headers: httpheaders })
      .pipe(
        map((response: any) => {
          const user = response;
          localStorage.setItem("token", user.tokenString);
          this.userToken = user.tokenString;
          console.log(response);
        })
      );
  }

  register(model: any) {
    let httpheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.baseUrl + "register", model, {
      headers: httpheaders
    });
  }
}
