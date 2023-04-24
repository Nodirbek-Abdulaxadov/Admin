import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Receipt } from 'src/app/models/Receipt';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})

export class SalesComponent implements OnInit {
  receipts: Observable<Receipt[]> | undefined;
  pagination: Pagination | undefined;

  constructor() {}

  ngOnInit(): void {
    this.paging(1);
  }

  paging(pageNumber: number) {
  }
}