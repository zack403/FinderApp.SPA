import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient,  HttpParams } from '@angular/common/http';
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


getUsers(page?, itemsPerPage?, userParams?: any, likesParam?: string) { 
  const paginatedResult : PaginatedResult<User[]> = new PaginatedResult<User[]>();
 let params = new HttpParams();

  if(page != null && itemsPerPage != null){
    params = params.append("pageNumber", page)
    params = params.append("pageSize", itemsPerPage)
  }


  if(likesParam === 'Likers') {
    params = params.append("Likers", 'true')
  }

  if(likesParam === 'Likees') {
    params = params.append("Likees", 'true')
  }

  if (userParams != null){
    params = params.append("minAge", userParams.minAge);
    params = params.append("maxAge", userParams.maxAge);
    params = params.append("gender", userParams.gender);
    params = params.append("orderBy", userParams.orderBy);

  }
  return this.http.get<User[]>(this.baseUrl + "user", { observe: 'response', params})
  .pipe(map(response  => {
    paginatedResult.result = response.body;
    if(response.headers.get("Pagination") != null) {
      paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
    }
    return paginatedResult;
  }));
}

  getUser(id) : Observable<User> {
  return this.http.get<User>(this.baseUrl + "user/" + id);
  }



  getMessages (id : number, page?, itemsPerpage?, messageContainer? : string) : Observable<any> {
    const paginatedResult : PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let params = new HttpParams();
  
    params = params.append("MessageContainer", messageContainer)

    if(page != null && itemsPerpage != null){
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerpage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'user/' + id + '/messages',{observe: 'response', params}).pipe(map(response => {
      paginatedResult.result = response.body;

      if(response.headers.get('Pagination') != null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
    );
  }

  getMessageThread(id: number, recipientId : number ){
    return this.http.get<Message[]>(this.baseUrl + "user/" + id + "/messages/thread/" + recipientId);
  };

  sendMessage(id : number, message : Message){
    return this.http.post<Message>(this.baseUrl + "user/" + id + "/messages", message);
  }


  deleteMessage(id : number, userId : number){
    return this.http.post(this.baseUrl + "user/" + userId + "/messages/" + id, {});
  };

  markAsRead(userId : number, messageId : number) {
    return this.http.post(this.baseUrl + "user/" + userId + '/messages/' + messageId + '/read', {}).subscribe();
  }
  deletePhoto(userId : number, id: number){
    return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id);
  }


  updateUser(id : number, user: User){
    return this.http.put(this.baseUrl + "user/" + id, user); 
  }

  setMainPhoto(userId : number, id : number){
   return this.http.post(this.baseUrl + "user/" + userId + "/photos/" + id + "/setMain", {});    
}

  sendLike(id: number, recipientId : number){

    return this.http.post(this.baseUrl + "user/" + id + "/like/" + recipientId, {});

  }



// private jwt(){  
//   let token = localStorage.getItem("token");
//   if(token){
//     let httpheaders = new HttpHeaders({ "Authorization": "Bearer " + token });
//     httpheaders.append("Content-type" , "application/json");
//     return {headers : httpheaders};
//   }
// }


}
