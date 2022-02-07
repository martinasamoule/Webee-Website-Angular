import { IProduct } from './../../../Models/iproduct';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { CartVM } from 'src/app/ViewModules/cart-vm';
import { ProductsComponent } from '../products/products.component';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  MyDate :Date ;
  TotalPrice : number ;
  ShowesAge : boolean = true;
  ShowesCredit : boolean = true;
  Showes: boolean = true;
  Categories: ICategory[];
  PriceFilterBy : number =0 ;
  NationalId : number = 29909011509345 ;
  // ChosenCategory : number = 0 ;
  // 30305050104923
  CreditNumber : string = "0000000000000000" ;
  AddedCartProducts: CartVM[] = [];
  RecivedCartProducts: CartVM[] = [];
  ProductList:IProduct[]=[]
  // @ViewChild(ProductsComponent) productListCompObj!: ProductsComponent;
  constructor(private ProductStaticServ : ProductStaticServService ,private APIProducts : APIProductServService) 
  { 
    this.MyDate = new Date();
    this.TotalPrice = 0;
    this.Categories = [
      { id: 1, name: 'Lab' },
      { id: 2, name: 'Mobile' },
    ];
  }
  ngOnInit(): void {
    this.AddedCartProducts = this.ProductStaticServ.RecievedAddedToCart();
    this.PutCartElements(this.AddedCartProducts)
    this.APIProducts.GetAllProducts().subscribe
    (
      products=>this.ProductList=products
    )
  }
  ToggleAge()
  {
    this.ShowesAge=!this.ShowesAge ;
  }

  ToggleFormat()
  {
    this.ShowesCredit=!this.ShowesCredit ;
  }

  PutPrice(Price:any)
  {
    this.PriceFilterBy = Price ;
    console.log(Price)
  }
  
  PutCartElements(Products : any)
  {
    this.AddedCartProducts=Products ;
    for(let i =0 ; i< this.AddedCartProducts.length ; i++)
    {
      this.TotalPrice += this.AddedCartProducts[i].PriceOfProd*this.AddedCartProducts[i].CountOfProd ;
    }
  }


  RemoveProduct(Name: string)
  {
    this.AddedCartProducts = this.AddedCartProducts.filter((product)=>
    {
      return product.ProductName != Name;
    });
    this.TotalPrice=0 ;
    for(let i =0 ; i< this.AddedCartProducts.length ; i++)
    {
      this.TotalPrice += this.AddedCartProducts[i].PriceOfProd*this.AddedCartProducts[i].CountOfProd ;
    }
    this.ProductStaticServ.CartProducts =  this.AddedCartProducts.filter((product)=>
    {
      return product.ProductName != Name;
    });
    console.log(this.ProductStaticServ.RemovedElements)
  }

  ConfirmOrder()
  {
    for(let i =0 ; i< this.ProductList.length ; i++)
    {
     
      for(let j =0 ; j< this.AddedCartProducts.length ; j++)
    {
      if(this.ProductList[i].id==this.AddedCartProducts[j].ProductId)
      { 
        if(this.ProductList[i].Quantity !=0)
        {
          this.ProductList[i].Quantity-=this.AddedCartProducts[j].CountOfProd ;
          this.AddedCartProducts[j].QuantityOfProd -= this.AddedCartProducts[j].CountOfProd ;
        }
      }
      this.APIProducts.UpdateProduct(this.ProductList[i].id,this.ProductList[i]).subscribe();
    }
    }
    this.Showes = false;
    this.AddedCartProducts=[];
    this.ProductStaticServ.CartProducts = [];
  }


  ChangeCount(Count:any , Id : number)
  {
    for(let i =0 ; i< this.AddedCartProducts.length ; i++)
    {
      if(this.AddedCartProducts[i].ProductId=Id)
       {
         if(this.AddedCartProducts[i].QuantityOfProd>=Count)
            this.AddedCartProducts[i].CountOfProd =Count ;
       } 
    }
  }
 

}
