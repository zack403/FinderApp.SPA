import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../services/alertify.service';
import { User } from './../models/User';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService, 
        private router : Router, 
        private alertifyService: AlertifyService){}

        
        resolve(route : ActivatedRouteSnapshot): Observable<User>{
            return this.userService.getUser(route.params['id']).pipe(catchError(error =>  {
                this.alertifyService.error("Problem retrieving data");
                this.router.navigate(["/members"]);
                return of(null);
            }));

        }


}