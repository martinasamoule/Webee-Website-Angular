import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthServService } from '../Services/user-auth-serv.service';
// import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class UserCanAccessGuard implements CanActivate {
  constructor(private UserAuthService : UserAuthServService , private Route: Router )
  {}
  // , private Snakbar :MatSnackBar
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.UserAuthService.IsUserLogged)
    {
      return true ;
    }
    else
    {
      //   this.Snakbar.open
      // (
      //   "You must login First...",'You must login First...',
      //   {
      //     duration: 2000,
      //     verticalPosition:'top' ,
      //     horizontalPosition : 'center',
      //   }
      // );
      alert ('You must login First...');
      this.Route.navigate(['/LogIn']);
      return false ;
    }
  }
  
}
