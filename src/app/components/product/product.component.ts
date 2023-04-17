import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]> | undefined;
  pagination: Pagination | undefined;
  product: Product = {
    id: 0,
    name: '',
    description: '',
    madeIn: '',
    barcode: '',
    warningCount: 0,
    subcategoryId: 0,
    subcategoryName: '',
    categoryId: 0,
    categoryName: '',
    adminId: '',
    adminFullName: '',
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.paging(1);
  }

  onProductSelect(product: Product) {
    this.product = product;
  }

  remove(id: number) {}

  paging(pageNumber: number) {
    this.products = this.productService.getPaged(pageNumber);
    this.pagination = this.productService.pagination;
  }
}
