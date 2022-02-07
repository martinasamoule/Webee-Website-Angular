import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsServiceService {
  AdsList : string[] ;

  constructor() { 
    this.AdsList = [
      "You are Lucky ... 70% discount if you order now " ,
      "Be happy it's shopping time  " ,
      "Check black friday discounts ",
      "Sale up to 50%"
    ]
  }

  GetAds(IntervalTime:number):Observable<string>
  {
    return new Observable <string> (observer=>
      {
        let Counter = 0;
        let IntervalAds = setInterval(()=>{
          if (Counter == this.AdsList.length)
          {
            observer.complete();
          }
          observer.next(this.AdsList[Counter]);
          Counter++;
        },IntervalTime*1000);

        return {
          unsubscribe(){
            clearInterval(IntervalAds);
          }
        }
      
      })
  }
}
