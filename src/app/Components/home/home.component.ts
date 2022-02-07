import { Component, OnInit } from '@angular/core';
import { DiscountOffers } from 'src/app/Models/discount-offers';
import { UserAuthServService } from 'src/app/Services/user-auth-serv.service';
import { Store } from 'src/app/ViewModules/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  StoreInfo: Store;
  ClientName: String = '';
  Discount: DiscountOffers;
  

  constructor(private UserAuthService : UserAuthServService ) {
    this.StoreInfo = new Store(
      'Webee',
      ['Cairo', 'Alex'],
      'assets/OIP.jpg'
    );
    this.Discount = DiscountOffers.NoDiscount;

   }

  ngOnInit(): void {
    this.UserAuthService.GetUserName().subscribe(Name=>
      {
        this.ClientName = Name ;
      }) ;
  }

}
