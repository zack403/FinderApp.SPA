import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { User } from '../models/User';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(private userService: UserService, 
        private router : Router, 
        private alertifyService: AlertifyService){}

        
        resolve(route : ActivatedRouteSnapshot): Observable<User[]>{
            return this.userService.getUsers().pipe(catchError(error =>  {
                this.alertifyService.error("problem retrieving data");
                this.router.navigate(["/home"]);
                return of(null);
            }));

        }


}