import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../helpers/token.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Pagination } from 'src/app/models/Pagination';
import { Observable, map } from 'rxjs';
import { Receipt } from 'src/app/models/Receipt';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  baseUrl: string = Constants.BASE_URL + 'receipt/';

  public pagination: Pagination = {
    HasPrevious: false,
    HasNext: false,
    TotalCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    TotalPages: 0,
  };

  getById(id: number): Observable<Receipt> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<Receipt>(this.baseUrl + id, { headers });
  }

  getPaged(pageNumber: number): Observable<Receipt[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    const url = `${this.baseUrl}paged?pageSize=10&pageNumber=${pageNumber}`;

    return this.httpClient.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        const products = response.body as Receipt[];
        const paginationHeader = response.headers.get('x-pagination');
        var xpagination = JSON.parse(paginationHeader ?? '');
        this.initPaginationParams(xpagination);
        return products;
      })
    );
  }

  initPaginationParams(xpagination: any): void {
    this.pagination.HasPrevious = xpagination['HasPrevious'];
    this.pagination.HasNext = xpagination['HasNext'];
    this.pagination.TotalCount = xpagination['TotalCount'];
    this.pagination.CurrentPage = xpagination['CurrentPage'];
    this.pagination.PageSize = xpagination['PageSize'];
    this.pagination.TotalPages = xpagination['TotalPages'];

    localStorage.setItem('pagination', JSON.stringify(this.pagination))
  }

  getToken() {
    var localdata = localStorage.getItem('data');
    var json = JSON.parse(localdata ?? '');
    return json['Token'];
  }
}
