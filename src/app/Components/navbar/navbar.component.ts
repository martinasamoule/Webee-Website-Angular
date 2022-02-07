import { NavigationEnd, Router } from '@angular/router';
import { UserAuthServService } from './../../Services/user-auth-serv.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  IsUser : boolean ;
  UserName : String = "" ;

  constructor(  private UserAuthService : UserAuthServService ,  private Location: Location
              , private Route : Router) { 
    this.IsUser = this.UserAuthService.IsUserLogged ;
    
  }

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
        this.UserName = '';
        
      }
    })

    this.UserAuthService.GetloggedStatus().subscribe(Status=>
      {
        this.IsUser = Status ;
      })

    this.UserAuthService.GetUserName().subscribe(Name=>
      {
        this.UserName = `Hello , ${Name}` ;
      }) ;
  }

  Logout()
  {
    this.UserAuthService.Logout();
    this.IsUser= this.UserAuthService.IsUserLogged;
    this.UserName = "";
    if
    (this.Location.isCurrentPathEqualTo("/Cart"))
    {
      this.Route.navigate(['/Home'])
    }
    else if(this.Location.isCurrentPathEqualTo("/User/UserProfile"))
    {
      this.Route.navigate(['/Home'])
    }
    else if (this.Location.isCurrentPathEqualTo("/User/EditProfile"))
    {
      this.Route.navigate(['/Home'])
    }
  }


}
