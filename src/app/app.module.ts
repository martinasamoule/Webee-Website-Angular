import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProductsComponent } from './Components/Order/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ShadowIncreaseDirective } from './Directives/shadow-increase.directive';
import { CartComponent } from './Components/Order/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NationalIDToAgePipe } from './Pipes/national-idto-age.pipe';
import { FormatCreditPipe } from './Pipes/format-credit.pipe';
import { NatToBirthPipe } from './Pipes/nat-to-birth.pipe';
import { HomeComponent } from './Components/home/home.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import {HttpClientModule} from '@angular/common/http';
import { CommanLayoutComponent } from './Components/comman-layout/comman-layout.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    FooterComponent,
    SidebarComponent,
    ShadowIncreaseDirective,
    CartComponent,
    NationalIDToAgePipe,
    FormatCreditPipe,
    NatToBirthPipe,
    HomeComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    LogInComponent,
    CommanLayoutComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule ,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
