import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http : HttpClient) { }


getUsers() : Observable<User[]>{ 
  // const paginatedResult : PaginatedResult<User[]> = new PaginatedResult<User[]>();
  // let queryString = "?";

  // if(page != null && itemsPerpage != null){
  //   queryString += "pageNumber=" + page + "&pageSize=" + itemsPerpage;
  // }


  // if(likesParam === 'likers') {
  //   queryString += 'Likers=true&';
  // }

  // if(likesParam === 'likees') {
  //   queryString += 'Likees=true&';
  // }

  // if (userParams != null){
  //   queryString +=
  //   'minAge=' + userParams.minAge + &
  //   'maxAge=' + userParams.maxAge + &
  //   'gender=' + userParams.gender + &
        //'orderBy=' + URLSearchParams.orderBy;
  // }
  return this.http.get(this.baseUrl + "user", this.jwt())
  .pipe(map(response  => <User[]>response
    // if(response.headers.get("Pagination") != null) {
    //   paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
    // }
    // return paginatedResult;
  ),
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

  getMessages (id : number, page? : number, itemsPerpage? : number, messageContainer? : string) : Observable<any> {
    const paginatedResult : PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let queryString = '?MessageContainer='+ messageContainer;

    if(page != null && itemsPerpage != null){
      queryString += '&pageNumber=' + page + '&pageSize=' + itemsPerpage;
    }

    return this.http.get(this.baseUrl + 'user/' + id + '/messages' + queryString, this.jwt()).pipe(map((response : any) => {
      paginatedResult.result = response;

      if(response.headers.get('Pagination') != null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }),catchError(this.handleError)
    );
  }

  getMessageThread(id: number, recipientId : number ){
    return this.http.get(this.baseUrl + "user/" + id + "/messages/thread" + recipientId, this.jwt()).pipe(map((response : Response) => {
      return response;
    }, catchError(this.handleError)));
  };

  sendMessage(id : number, message : Message){
    return this.http.post(this.baseUrl + "user/" + id + "/messages", message, this.jwt()).pipe(map((response : Response) => {
      return response;
    }, catchError(this.handleError)));
  }


  deleteMessage(id : number, userId : number){
    return this.http.post(this.baseUrl + "user/" + userId + "/messages/" + id, {},  this.jwt()).pipe(catchError(this.handleError));
  };

  markAsRead(userId : number, messageId : number) {
    return this.http.post(this.baseUrl + "user/" + userId + '/messages' + messageId + '/read', {}, this.jwt()).subscribe();
  }
  deletePhoto(userId : number, id: number){
    return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id, this.jwt()).pipe(catchError(this.handleError));
  }


  updateUser(id : number, user: User){
    return this.http.put(this.baseUrl + "user/" + id, user, this.jwt()).pipe(catchError(this.handleError)); 
  }

  setMainPhoto(userId : number, id : number){
   return this.http.post(this.baseUrl + "user/" + userId + "/photos/" + id + "/setMain", {}, this.jwt()).pipe(catchError(this.handleError));    
}

  sendLike(id: number, recipientId : number){

    return this.http.post(this.baseUrl + "user/" + id + "/like/" + recipientId, {}, this.jwt()).pipe(catchError(this.handleError));

  }

private handleError(error: any) {
  if(error.status === 400){
    return Observable.throw(error._body);
  }
  const applicationerror = error.headers.get("Application-Error");
  if (applicationerror) {
    return Observable.throw(applicationerror);
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
  return Observable.throw(modelStatErrors || "serverError");
}

}
