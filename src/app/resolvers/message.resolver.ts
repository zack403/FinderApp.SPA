import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { User } from '../models/User';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';
    

    constructor(private userService: UserService, 
        private router : Router, private authService : AuthService,
        private alertifyService: AlertifyService){}

        
        resolve(route : ActivatedRouteSnapshot): Observable<Message[]>{
            return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
            .pipe(catchError(error =>  {
                this.alertifyService.error("problem retrieving data");
                //this.router.navigate(["/home"]);
                return of(null);
            }));

        }


}