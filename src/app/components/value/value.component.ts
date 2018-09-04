import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-value",
  templateUrl: "./value.component.html",
  styleUrls: ["./value.component.css"]
})
export class ValueComponent implements OnInit {
  values;
  private url = "http://localhost:5000/api/value";
  constructor(private http: HttpClient, private authservice: AuthService) {}

  ngOnInit() {}
  // getValues() {
  //   let httpheaders = new HttpHeaders({ token: this.authservice.userToken });
  //   this.http.get(this.url, { headers: httpheaders }).subscribe(response => {
  //     console.log(response);
  //     this.values = response;
  //   });
  // }
}
