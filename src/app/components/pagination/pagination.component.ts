import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  
constructor(private router: Router){}

  public pagination: Pagination = {
    HasPrevious: false,
    HasNext: false,
    TotalCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    TotalPages: 0,
  };

  ngOnInit(): void {
    this.pagination = JSON.parse(localStorage.getItem('pagination')??"");
  }

  paging(pageNumber: number) {
    pageNumber = Math.round(pageNumber);
    this.router.navigate(['/product', pageNumber]);
  }
}
