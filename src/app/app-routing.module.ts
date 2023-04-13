import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/root/home/home.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { ProductComponent } from './components/product/product.component';
import { NewProductComponent } from './components/product/new-product/new-product.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'subcategory', component: SubcategoryComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product/add', component: NewProductComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
