import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http : HttpClient) { }


getUsers() : Observable<User[]>{ 
  return this.http.get(this.baseUrl + "user", this.jwt())
  .pipe(map(response => <User[]> response),
  catchError(this.handleError)
  );
}

getUser(id) : Observable<User> {
  return this.http.get(this.baseUrl + "user/" + id, this.jwt())
  .pipe(map(response => <User>response),
  catchError(this.handleError)
  );
}

private jwt(){  
  let token = localStorage.getItem("token");
  if(token){
    let httpheaders = new HttpHeaders({ "Authorization": "Bearer " + token });
    httpheaders.append("Content-type" , "application/json");
    return {headers : httpheaders};
  }
}

  deletePhoto(userId : number, id: number){
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id).pipe(catchError(this.handleError));
  }


  updateUser(id : number, user: User){
    return this.http.put(this.baseUrl + "user/" + id, user, this.jwt()).pipe(catchError(this.handleError)); 
  }

  setMainPhoto(userId : number, id : number){
   return this.http.post(this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain", this.jwt(), {}).pipe(catchError(this.handleError));    
}

private handleError(error: any) {
  const applicationerror = error.headers.get("Application-Error");
  if (applicationerror) {
    return throwError(applicationerror);
  }
  const serverError = error;
  let modelStatErrors = "";
  if (serverError) {
    for (const key in serverError) {
      if (serverError[key]) {
        modelStatErrors += serverError[key] + "\n";
      }
    }
  }
  return throwError(modelStatErrors || "serverError");
}

}
