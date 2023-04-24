import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../helpers/token.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Pagination } from 'src/app/models/Pagination';
import { Observable, map, share, tap } from 'rxjs';
import { WarehouseItem } from 'src/app/models/WarehouseItem';

@Injectable({
  providedIn: 'root'
})
export class WarehouseItemService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  baseUrl: string = Constants.BASE_URL + 'warehouseItem/';

  public pagination: Pagination = {
    HasPrevious: false,
    HasNext: false,
    TotalCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    TotalPages: 0,
  };

  getAll(): Observable<WarehouseItem[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<WarehouseItem[]>(this.baseUrl, { headers });
  }

  getById(id: number): Observable<WarehouseItem> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<WarehouseItem>(this.baseUrl + id, { headers });
  }

  getPaged(pageNumber: number): Observable<WarehouseItem[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
  
    const url = `${this.baseUrl}paged?pageSize=5&pageNumber=${pageNumber}`;
  
    return this.httpClient.get<WarehouseItem[]>(url, { headers, observe: 'response' }).pipe(
      tap((response) => {
        const paginationHeader = response.headers.get('x-pagination');
        var xpagination = JSON.parse(paginationHeader ?? '');
        this.initPaginationParams(xpagination);
      }),
      share(),
      map((response) => response.body as WarehouseItem[])
    );
  }

  add(form: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    form.adminId = this.tokenService.getUserId();
    this.httpClient.post(this.baseUrl, form, { headers }).subscribe({
      next: (data) => {
        this.toastr
          .success("Muvofaqqiyatli qo'shildi!")
          .onHidden.subscribe(() => {
            this.router.navigate(['/warehouse-items']);
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          timeOut: 3000,
        });
      },
    });
  }

  remove(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    this.httpClient.delete(this.baseUrl + id, {headers}).subscribe({ 
      next: data => {
        this.toastr.success("Muvofaqqiyatli o'chirildi!").onHidden.subscribe(() => {
          window.location.reload();
        });
        },
      error: error => {
          this.toastr.error("Qandaydir xatolik yuz berdi!",'', {timeOut: 3000});
        }});
  }

  edit(form: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    form.adminId = this.tokenService.getUserId();

    this.httpClient.put(this.baseUrl, form, { headers }).subscribe({
      next: (data) => {
        localStorage.setItem('barcode', '');
        this.toastr
          .success("Muvofaqqiyatli tahrirlandi!")
          .onHidden.subscribe(() => {
            this.router.navigate(['/warehouse-items']);
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          timeOut: 3000,
        });
      },
    });
  }

  initPaginationParams(xpagination: any): void {
    this.pagination.HasPrevious = xpagination['HasPrevious'];
    this.pagination.HasNext = xpagination['HasNext'];
    this.pagination.TotalCount = xpagination['TotalCount'];
    this.pagination.CurrentPage = xpagination['CurrentPage'];
    this.pagination.PageSize = xpagination['PageSize'];
    this.pagination.TotalPages = xpagination['TotalPages'];
  }

  getToken() {
    var localdata = localStorage.getItem('data');
    var json = JSON.parse(localdata ?? '');
    return json['Token'];
  }
}
