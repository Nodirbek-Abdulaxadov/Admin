import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/root/home/home.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { ProductComponent } from './components/product/product.component';
import { NewProductComponent } from './components/product/new-product/new-product.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PrintComponent } from './pages/print/print.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { WarehouseItemComponent } from './components/warehouse-item/warehouse-item.component';
import { NewWarehouseItemComponent } from './components/warehouse-item/new-warehouse-item/new-warehouse-item.component';
import { EditWarehouseItemComponent } from './components/warehouse-item/edit-warehouse-item/edit-warehouse-item.component';
import { SalesComponent } from './components/sales/sales.component';
import { CustomerComponent } from './components/customer/customer.component';
import { UserComponent } from './components/user/user.component';
import { SellerComponent } from './components/seller/seller.component';
import { TransferComponent } from './components/transfer/transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WarehouseComponent,
    LoginComponent,
    CategoryComponent,
    SubcategoryComponent,
    ProductComponent,
    NewProductComponent,
    ServerErrorComponent,
    NotFoundComponent,
    PrintComponent,
    EditProductComponent,
    WarehouseItemComponent,
    NewWarehouseItemComponent,
    EditWarehouseItemComponent,
    SalesComponent,
    CustomerComponent,
    UserComponent,
    SellerComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation: 'decreasing',
      progressBar: true,
      closeButton: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
