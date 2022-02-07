import { ICategory } from './../Models/icategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServService {

  constructor(private HTTPClient : HttpClient) { }
  GetAllCategories():Observable<ICategory[]>
  {
    return this.HTTPClient.get<ICategory[]>(`${environment.APIURL}/Categories`);
  }
  
  GetCategoryNameById(id:number):Observable< ICategory>
  {
    ;
    let Category  =this.HTTPClient.get<ICategory>(`${environment.APIURL}/Categories/${id}`)
     
      return Category;
  }
}
