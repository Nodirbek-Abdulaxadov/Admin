import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/models/Loan';
import { Pagination } from 'src/app/models/Pagination';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  pagination: Pagination | undefined;
  loans: Observable<Loan[]> | undefined;

  public page: number = 0;

  constructor(private actRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.page = Number(routeParams.get('page')??1);
    this.paging(this.page);
  }

  onLoanSelect() {

  }

  paging(pageNumber: number) {
    this.page = Math.round(pageNumber);

    // if (pageNumber > this.productService.pagination.CurrentPage && pageNumber > 3) {
    //   pageNumber -= 1;
    // }
    // else if (pageNumber < this.productService.pagination.CurrentPage && pageNumber > 3) {
    //   pageNumber += 1;
    // }

    // this.products = this.productService.getPaged(this.page);
    // this.pagination = this.productService.pagination;
    this.router.navigate(['/loans', this.page]);
  }
}
