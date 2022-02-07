import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServService } from 'src/app/Services/category-serv.service';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  UpdatedProduct: IProduct = {} as IProduct;
  RecievedProductId: number = 0;
  Categories: ICategory[] = [];
  Category:string ="" ;
  ForUpdateProduct: IProduct = {} as IProduct;
  Message : string = "" ;
  Show: boolean = false ;

  constructor(
    private ProductStaticServ: ProductStaticServService,
    private ActivatedRoute: ActivatedRoute,
    private CategoryServ: CategoryServService,
    private APIProducts : APIProductServService, 
    private Route : Router ,
  ) {}

  ngOnInit(): void {
    this.RecievedProductId = Number(
      this.ActivatedRoute.snapshot.paramMap.get('ID'));
    // this.ForUpdateProduct = this.ProductStaticServ.GetProductsByID(this.RecievedProductId);
    // this.CategoriesIds = this.ProductStaticServ.GetAllProductsCategoriesId();
    //   this.CategoriesIds = this.CategoriesIds.filter((Category, index) => {
    //     return this.CategoriesIds.indexOf(Category) === index;
    // });
    this.APIProducts.GetProductById(this.RecievedProductId).subscribe
    (
      product=>
      {
        this.ForUpdateProduct=product
        this.CategoryServ.GetCategoryNameById(product.id).subscribe
      (
        cat=>this.Category= cat.name
      )
      }
  
      
    )
    this.CategoryServ.GetAllCategories().subscribe(
      (categories) => (this.Categories = categories)
    );

  }
  UpdateProduct() {
    const observer =
    {
      next: () => {
        this.Message = "Product Updated" ;  
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
    this.APIProducts.UpdateProduct(this.ForUpdateProduct!.id,this.ForUpdateProduct!).subscribe(observer);
    // this.ProductStaticServ.UpdateInProduct(this.UpdatedProduct) ;
  }
}
