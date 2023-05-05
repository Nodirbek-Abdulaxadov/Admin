import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Receipt } from 'src/app/models/Receipt';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})

export class SalesComponent implements OnInit {

  receipts: Observable<Receipt[]> | undefined;
  pagination: Pagination | undefined;

  receipt: Receipt = {
    Id: 0,
    Discount: 0,
    AddedDate: new Date(),
    PaidCard: 0,
    PaidCash: 0,
    SellerId: 0,
    SellerFullName: '',
    TotalPrice: 0,
    Transactions: []
  };

  public page: number = 1;

  constructor(private salesService: SalesService,
              private actRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.page = Number(routeParams.get('page')??1);
    this.paging(this.page);
  }

  paging(pageNumber: number) {
    this.page = Math.round(pageNumber);

    if (pageNumber > this.salesService.pagination.CurrentPage && pageNumber > 3) {
      pageNumber -= 1;
    }
    else if (pageNumber < this.salesService.pagination.CurrentPage && pageNumber > 3) {
      pageNumber += 1;
    }
    this.receipts = this.salesService.getPaged(this.page);
    this.pagination = this.salesService.pagination;
    this.router.navigate(['/sales/page', this.page]);
  }

  selectSales(item: Receipt) {
    this.receipt = item;
  }
}