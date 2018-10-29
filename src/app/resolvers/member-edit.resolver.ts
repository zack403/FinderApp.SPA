import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../services/alertify.service';
import { User } from './../models/User';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService, 
        private router : Router, 
        private alertifyService: AlertifyService, private authService: AuthService){}

        
        resolve(route : ActivatedRouteSnapshot): Observable<User>{
            return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError(error =>  {
                this.alertifyService.error("Problem retrieving data");
                this.router.navigate(["/members"]);
                return of(null);
            }));

        }


}