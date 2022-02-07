import { Component, OnInit } from '@angular/core';
import { UserAuthServService } from 'src/app/Services/user-auth-serv.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  ClientName : string = '';

  constructor(private UserAuthService : UserAuthServService ) { }

  ngOnInit(): void {
    this.UserAuthService.GetUserName().subscribe(Name=>
      {
        this.ClientName = Name ;
      }) ;
  }

}
