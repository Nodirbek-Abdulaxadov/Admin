import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { TokenService } from '../helpers/token.service';
import { Constants } from 'src/app/models/Constants';
import { Pagination } from 'src/app/models/Pagination';
import { Transfer } from 'src/app/models/Transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  baseUrl: string = Constants.BASE_URL + 'transfer/';

  public pagination: Pagination = {
    HasPrevious: false,
    HasNext: false,
    TotalCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    TotalPages: 0,
  };

  getPaged(pageNumber: number): Observable<Transfer[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    const url = `${this.baseUrl}paged?pageSize=10&pageNumber=${pageNumber}`;

    return this.httpClient.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        const transfers = response.body as Transfer[];
        const paginationHeader = response.headers.get('x-pagination');
        var xpagination = JSON.parse(paginationHeader ?? '');
        this.initPaginationParams(xpagination);
        return transfers;
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
