import { CategoryServService } from './../../Services/category-serv.service';
import { IProduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { Router } from '@angular/router';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';
import { ICategory } from 'src/app/Models/icategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  AddedProduct:IProduct ={} as IProduct ;
  Categories : ICategory[] = [] ;
  Message : string = "" ;
  Show: boolean = false ;
  constructor(private ProductStaticServ : ProductStaticServService , private APIProducts : APIProductServService
    , private Route : Router , private CategoryServ : CategoryServService ) { }

  ngOnInit(): void {
  //   this.CategoriesIds = this.ProductStaticServ.GetAllProductsCategoriesId();
  //   this.CategoriesIds = this.CategoriesIds.filter((Category, index) => {
  //     return this.CategoriesIds.indexOf(Category) === index;
  // });
  this.CategoryServ.GetAllCategories().subscribe
  (
    categories=>this.Categories=categories
  )
  console.log(this.Categories)
  }
  

  AddProduct()
  {
    // this.ProductStaticServ.AddProduct(this.AddedProduct) ;
    const observer =
    {
      next: () => {
        this.Message = "Product Added" ;  
        setTimeout(() => {
          this.Route.navigate(['/Products']) ;
          this.Show= false;
        }, 2000);
        this.Show = true ;
      },
      error: (err:Error)=>{
        this.Message =`${err.message}` 
        setTimeout(() => {
          this.Show= false;
        }, 3000);
        this.Show = true ;
      } ,
    }
    this.APIProducts.AddProduct(this.AddedProduct).subscribe(observer);

  }

}
