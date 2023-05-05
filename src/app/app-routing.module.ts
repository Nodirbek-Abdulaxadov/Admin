import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { CustomerComponent } from './components/customer/customer.component';
import { UserComponent } from './components/user/user.component';
import { SellerComponent } from './components/seller/seller.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { SalesComponent } from './components/sales/sales.component';
import { ManagePriceComponent } from './components/manage-price/manage-price.component';
import { ManageDiscountComponent } from './components/manage-discount/manage-discount.component';
import { PartnersComponent } from './components/partners/partners.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { TaxComponent } from './components/tax/tax.component';
import { CommunalComponent } from './components/communal/communal.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { LoanComponent } from './components/loan/loan.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'subcategory', component: SubcategoryComponent},
  {path: 'product/page/:page', component: ProductComponent},
  {path: 'product/add', component: NewProductComponent},
  {path: 'product/edit/:productId', component: EditProductComponent},
  {path: 'print/:barcode', component: PrintComponent},
  {path: 'warehouse-items', component: WarehouseItemComponent},
  {path: 'warehouse-items/add', component: NewWarehouseItemComponent},
  {path: 'warehouse-item/edit/:warehouseItemId', component: EditWarehouseItemComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'transfers/page/:page', component: TransferComponent},
  {path: 'users/admin', component: UserComponent},
  {path: 'users/seller', component: SellerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sales/page/:page', component: SalesComponent},
  {path: 'price-management', component: ManagePriceComponent},
  {path: 'discount', component: ManageDiscountComponent},
  {path: 'partners', component: PartnersComponent},
  {path: 'loans/:page', component: LoanComponent},
  {path: 'suppliers', component: SupplierComponent},
  {path: 'taxes', component: TaxComponent},
  {path: 'communal', component: CommunalComponent},
  {path: 'other-expenses', component: ExpenseComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
