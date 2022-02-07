import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { CommanLayoutComponent } from './Components/comman-layout/comman-layout.component';
import { UserCanAccessGuard } from './Gaurds/user-can-access.guard';
import { LogInComponent } from './Components/log-in/log-in.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CartComponent } from './Components/Order/cart/cart.component';
import { ProductsComponent } from './Components/Order/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';

const routes: Routes = [
  {path: '', component: CommanLayoutComponent, children:[
    {path: '', redirectTo :'/Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'Products', component: ProductsComponent},
    {path: 'Cart', component: CartComponent , canActivate:[UserCanAccessGuard]} ,
    {path: 'Products/:ID', component: ProductDetailsComponent} ,
    {path: 'AddProduct', component: AddProductComponent,canActivate:[UserCanAccessGuard]},
    {path: 'UpdateProduct/:ID', component: UpdateProductComponent , canActivate:[UserCanAccessGuard]} ,
    
    {path : 'User' , 
      loadChildren : ()=>import('src/app/user-mod/user-mod.module').then(m=>m.UserModModule)
    }
  ]},
  {path: 'LogIn', component: LogInComponent} ,
  {path: 'Regist', component: RegisterFormComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
