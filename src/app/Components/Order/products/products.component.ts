import { AdsServiceService } from './../../../Services/ads-service.service';
import { ICategory } from '../../../Models/icategory';
import { IProduct } from '../../../Models/iproduct';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CartVM } from 'src/app/ViewModules/cart-vm';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { observable, Subscription, Observable } from 'rxjs';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnChanges ,OnDestroy {
  // ProductList: IProduct[] = [];
  FilterProductList: IProduct[] = [];
  @Input() SendedCategory: number;
  @Input() PriceToFilter: number = 0;
  @Input() RemovedElements: CartVM[] = [];
  Showes: boolean;
  ChosenCategory : number = 0 ;
  Categories: ICategory[];
  CartProducts: CartVM[] = [];
  EnoughProduct: boolean = false;
  @Output() AddToCartElements: EventEmitter<CartVM[]>;
  AdsShow : boolean = false ;
  AdMessage : string = "";
  SubScriptionArray : Subscription[] =[] ;
  WantToDeleteId : number = 0 ;

  constructor( private ProductStaticServ : ProductStaticServService , private APIProducts : APIProductServService
     , private AdsService : AdsServiceService) {
    this.SendedCategory = 0;
    this.Showes = true;
    this.AddToCartElements = new EventEmitter<CartVM[]>();
    this.Categories = [
      { id: 1, name: 'Lab' },
      { id: 2, name: 'Mobile' },
    ];
  }


  ngOnChanges(): void { 

  }
  
  ngOnInit(): void {
    // this.FilterProductList = this.ProductStaticServ.GetAllProducts();
    this.APIProducts.GetAllProducts().subscribe
    (
      products=>this.FilterProductList = products 
    );
   

    let Observer = 
    {
      next : (Ad:string )=>
      {
        this.AdMessage = Ad ;
        this.AdsShow = true ;
      },
      complete : ()=>
      {
        this.AdsShow = false ;
      } 
    }

    let AdsObserver = this.AdsService.GetAds(4).subscribe(Observer);
    this.SubScriptionArray.push(AdsObserver);
  }


  ngOnDestroy(): void {
    for(let SubScripe of this.SubScriptionArray)
    {
      SubScripe.unsubscribe();
    }
  }

  DeleteProduct(ProductId:number)
  {
    this.APIProducts.DeleteProduct(ProductId).subscribe
    (
      ()=>
      {
        for(let i = 0 ; i<this.FilterProductList.length ; i++)
        {
          if(ProductId==this.FilterProductList[i].id)
          {
            this.FilterProductList.splice(i,1)
          }
        }
        
      }
    )

    console.log(ProductId)
  }

  ToggleShow() {
    this.Showes = !this.Showes;
  }

  AddToCart(Quantity: number, Price: number, Name: string, Count: any , Id:number ) {
    // let result = this.ProductList.filter((product) => {
    //   return product.Id === id;
    // });
    // if (result[0].Quantity != 0 && result[0].Quantity>=count)
    // result[0].Quantity = Quantity- +count;
    // else
    // alert("Not enough of this product in store !!!!")
    
    this.CartProducts = this.ProductStaticServ.AddToCart(Quantity, Price, Name, Count , Id );
    console.log(this.CartProducts)
    // this.AddToCartElements.emit(this.CartProducts);
  }

  FilterCategory(categoryid: any) {
    this.APIProducts.GetProductByCategoryId(+categoryid).subscribe
    (
      products=>this.FilterProductList = products 
    );
    // this.FilterProductList = this.ProductStaticServ.FilterProductsByCategory(categoryid);
    // this.SendedCategory = +categoryid;
  //   // if (this.SendedCategory == 0) this.FilterProductList = this.ProductList;
  //   // else
  //   //   this.FilterProductList = this.ProductList.filter((product) => {
  //   //     return product.CategoryId == +categoryid;
  //   //   });
  //   this.ChosenCategory = +categoryid;
  //   if (this.ChosenCategory == 0) this.FilterProductList = this.ProductList;
  //   else
  //     this.FilterProductList = this.ProductList.filter((product) => {
  //       return product.CategoryId == +categoryid;
  //     });
  }

  // FilterByPrice() {
  //   console.log(this.PriceToFilter);
  //   if (this.PriceToFilter == 0) this.FilterProductList = this.ProductList;
  //   else
  //     this.FilterProductList = this.ProductList.filter((product) => {
  //       return product.Price <= this.PriceToFilter;
  //     });
  // }





}
