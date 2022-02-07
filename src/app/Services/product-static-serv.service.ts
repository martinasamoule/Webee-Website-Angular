import { CartVM } from './../ViewModules/cart-vm';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductStaticServService {
  // ProductList: IProduct[];
  CartProducts: CartVM[] = [];
  RemovedElements : CartVM [] = [] ;

  constructor() { 
  }

  // GetAllProducts() : IProduct[]
  // {
  //   return this.ProductList ;
  // }

  // GetProductsByID (ProductId:number):IProduct | null 
  // {
  //   let WantedProduct = this.ProductList.find(prod=>prod.Id == ProductId) ;
  //   console.log(ProductId)
  //   return WantedProduct ? WantedProduct : null  ;
  // }

  // FilterProductsByCategory(CategoryId : number) : IProduct[]
  // {
  //   if (CategoryId == 0) 
  //     return this .ProductList ;
  //   else
  //     return this.ProductList.filter((product) => {
  //       return product.CategoryId == CategoryId;
  //     });
  // }

  // AddProduct(Product : IProduct)
  // {
  //   let checkProduct = this.ProductList.find(prod=>prod.Id == Product.Id) ;
  //   if(checkProduct)
  //   {
  //     alert("Duplicated Id")
  //   }
  //   else 
  //   {
  //     this.ProductList.push(Product);
  //     alert("Product added")
  //   }
    
  // }

  // UpdateInProduct(EditProduct : IProduct)
  // {
  //   let EditIndex=this.ProductList.findIndex(elem=>elem.Id==EditProduct.Id);
  //   let checkProduct = this.ProductList.find(prod=>prod.Id == EditProduct.Id) ;
  //   if(!checkProduct)
  //   {
  //     alert("Not have this Product");
  //   }
  //   else
  //   {
  //     this.ProductList[EditIndex] = EditProduct ;
  //     let checkProductindex = this.CartProducts.findIndex(prod=>prod.ProductId == EditProduct.Id);
  //     let CartEditProduct : CartVM = 
  //     {
  //       ProductId:EditProduct.Id ,
  //       ProductName : EditProduct.Name ,
  //       CountOfProd : 1,
  //       PriceOfProd : EditProduct.Price ,
  //       QuantityOfProd :EditProduct.Quantity
  //     }
  //     let CheckProductInCart = this.CartProducts.find(prod=>prod.ProductId == CartEditProduct.ProductId) 
  //     if(CheckProductInCart)
  //     {
  //       this.CartProducts[checkProductindex]={        
  //         ProductId:EditProduct.Id ,
  //         ProductName : EditProduct.Name ,
  //         CountOfProd : this.CartProducts[checkProductindex].CountOfProd,
  //         PriceOfProd : EditProduct.Price ,
  //         QuantityOfProd :EditProduct.Quantity}
  //     }
  //     // this.CartProducts[checkProductindex] = CartEditProduct ;
  //     alert("Product updated")
  //   }
    
  // }

  // GetAllProductsIds() : number []
  // {
  //   let AllProductsIds: number[] = this.ProductList.map(product=>product.Id);
  //   return AllProductsIds ;
  // }

  // GetAllProductsCategoriesId() : number []
  // {
  //   let AllProductsCategoriesId: number[] = this.ProductList.map(product=>product.CategoryId);
  //   return AllProductsCategoriesId ;
  // }

  // AddToCart(AddedProduct : any)
  // {
  //   this.CartProducts .push(AddedProduct)  ;
  // }
  AddToCart(Quantity: number, Price: number, Name: string, Count: any , Id:number ) :CartVM [] {
    if (Quantity != 0 && Quantity>=Count && Count!=0) {
      let Found =this.CartProducts.find(Product=>Product.ProductId==Id)
      if(Found)
      {
        this.CartProducts.map(product=>
          {
            if(product.ProductId==Id)
            {
              product.CountOfProd += +Count ;
            }
          })
      }
      else
      {
        this.CartProducts.push({
        ProductName: Name,
        CountOfProd: +Count,
        PriceOfProd: Price,
        QuantityOfProd: Quantity,
        ProductId:Id
      });
      }
     
    }
    console.log(this.RemovedElements)
    console.log(this.CartProducts)
     return this.CartProducts ;
  }

  RecievedAddedToCart(): CartVM[]
  {
    if(this.RemovedElements.length!=0)
    { 
      this.CartProducts = this.RemovedElements ;
      console.log(this.CartProducts)
    }
    return this.CartProducts ;
  }
}
