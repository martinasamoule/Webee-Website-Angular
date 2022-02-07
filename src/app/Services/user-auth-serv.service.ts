import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServService {

  private IsLogin : BehaviorSubject<boolean> ;
  private UserName : BehaviorSubject<string>  ;

  constructor(private Route : Router) { 
    this.IsLogin = new BehaviorSubject <boolean> (this.IsUserLogged) ;
    this.UserName = new BehaviorSubject <string> ("") ;
    
    // dedect browser refresh 
    this.Route.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects 
      ) 
      {
        // let UserNameLocalStorage = localStorage.getItem("UserName") ;
        // this.UserName.next(UserNameLocalStorage?UserNameLocalStorage:"")       
        localStorage.removeItem("Token") ;
        localStorage.removeItem("UserName");
      }
    }) 
  }

  Login(UserName: string, Password: string)
  {
    let UserToken = '7548621' ;
    localStorage.setItem("Token", UserToken) ;
    localStorage.setItem("UserName",UserName);
    this.IsLogin.next(true) ;
    this.UserName.next(UserName) ;
  }

  Logout()
  {
    localStorage.removeItem("Token") ;
    localStorage.removeItem("UserName")
    this.IsLogin.next(false) ;
    this.UserName.next("") ;
  }

  get IsUserLogged(): boolean
  {
    return (localStorage.getItem('Token'))? true: false ;
  }

  GetloggedStatus(): Observable<boolean>
  {
    return this.IsLogin.asObservable();
  }
  
  GetUserName(): Observable<string>
  {
    return this.UserName.asObservable();
  }
}
