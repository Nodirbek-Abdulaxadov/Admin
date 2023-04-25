import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Transfer } from 'src/app/models/Transfer';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  transfers: Observable<Transfer[]> | undefined;
  pagination: Pagination | undefined;

  public page: number = 0;

  constructor(
    private transferService: TransferService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private cdrf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.page = Number(routeParams.get('page') ?? 1);
    this.paging(this.page);
  }


  paging(pageNumber: number) {
    this.page = Math.round(pageNumber);

    if (
      pageNumber > this.transferService.pagination.CurrentPage &&
      pageNumber > 3
    ) {
      pageNumber -= 1;
    } else if (
      pageNumber < this.transferService.pagination.CurrentPage &&
      pageNumber > 3
    ) {
      pageNumber += 1;
    }

    this.transfers = this.transferService.getPaged(this.page);
    this.pagination = this.transferService.pagination;
    this.router.navigate(['/transfers/page', this.page]);
  }
}
