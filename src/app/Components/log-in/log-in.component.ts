import { Location } from '@angular/common';
import { UserAuthServService } from './../../Services/user-auth-serv.service';
import { Component, OnInit } from '@angular/core';
import { query } from '@angular/animations';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  IsUser : boolean = false ;

  constructor( private UserAuthService : UserAuthServService , private Location: Location
              , private Route : Router) { }

  ngOnInit(): void {
        //dedect browser refresh 
        this.Route.events
        .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
        .subscribe(event => {
          if (
            event.id === 1 &&
            event.url === event.urlAfterRedirects 
          ) 
          {
            this.IsUser = false ;

          }
        })
  }

  Login(UserName : string , Password : string)
  {
    this.UserAuthService.Login(UserName, Password);
    this.IsUser= this.UserAuthService.IsUserLogged;
    this.Location.back(); 
  }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route.url);
}


}
