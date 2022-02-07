import { IProduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { Location } from '@angular/common';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  // function in service may return null if no product with this id 
  Product : IProduct | null = null ;
  WantedProductId : number = 0 ;
  AllProducts: IProduct[] = [] ;
  constructor(private ProductStaticServ : ProductStaticServService , private ActivatedRoute: ActivatedRoute
            , private Router: Router , private Location: Location ,private APIProducts : APIProductServService) 
  {

  }

  ngOnInit(): void {
    // this.AllProductsIds = this.ProductStaticServ.GetAllProductsIds();
    this.APIProducts.GetAllProducts().subscribe
    (
      products=>this.AllProducts=products 
    )
    this.ActivatedRoute.paramMap.subscribe(parmMap=>
      {
        this.WantedProductId = Number(parmMap.get('ID')) ;
        // this.Product = this.ProductStaticServ.GetProductsByID(this.WantedProductId);
        this.APIProducts.GetProductById(this.WantedProductId).subscribe
        (
          product=>this.Product=product 
        )
        console.log(this.Product)
      })
  }

  Back()
  {
    this.Location.back();
  }

  Previous()
  {
    let CurrentIndex = this.AllProducts.findIndex(product=>product.id==this.WantedProductId);
    let PrevProductID ;
    if(CurrentIndex > 0)
    {
      PrevProductID = this.AllProducts[CurrentIndex-1].id;
      this.Router.navigate(['/Products', PrevProductID]);
    }
  }

  Next()
  {
    let CurrentIndex = this.AllProducts.findIndex(product=>product.id==this.WantedProductId);
    let NextProductID ;
    if(CurrentIndex < this.AllProducts.length)
    {
      NextProductID = this.AllProducts[CurrentIndex+1].id;
      this.Router.navigate(['/Products', NextProductID]);
    }
    
  }

}
