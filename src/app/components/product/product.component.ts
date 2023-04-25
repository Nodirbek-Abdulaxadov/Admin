import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    quantity: 0,
    addedDate: new Date(),
    modifiedDate: new Date()
  };

  public page: number = 0;

  constructor(private productService: ProductService,
              private actRoute: ActivatedRoute,
              private router: Router,
              private cdrf: ChangeDetectorRef) {}

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.page = Number(routeParams.get('page')??1);
    this.paging(this.page);
  }

  onProductSelect(product: Product) {
    this.product = product;
  }

  remove(id: number) {
    this.productService.remove(id);
  }

  paging(pageNumber: number) {
    this.page = Math.round(pageNumber);

    if (pageNumber > this.productService.pagination.CurrentPage && pageNumber > 3) {
      pageNumber -= 1;
    }
    else if (pageNumber < this.productService.pagination.CurrentPage && pageNumber > 3) {
      pageNumber += 1;
    }

    this.products = this.productService.getPaged(this.page);
    this.pagination = this.productService.pagination;
    this.router.navigate(['/product/page', this.page]);
  }
}
