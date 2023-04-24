import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Constants } from 'src/app/models/Constants';
import { Pagination } from 'src/app/models/Pagination';
import { Product } from 'src/app/models/Product';
import { TokenService } from '../helpers/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  baseUrl: string = Constants.BASE_URL + 'product/';

  public pagination: Pagination = {
    HasPrevious: false,
    HasNext: false,
    TotalCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    TotalPages: 0,
  };

  getAll(): Observable<Product[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<Product[]>(this.baseUrl, { headers });
  }

  getById(id: number): Observable<Product> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<Product>(this.baseUrl + id, { headers });
  }

  getPaged(pageNumber: number): Observable<Product[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    const url = `${this.baseUrl}paged?pageSize=10&pageNumber=${pageNumber}`;

    return this.httpClient.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        const products = response.body as Product[];
        const paginationHeader = response.headers.get('x-pagination');
        var xpagination = JSON.parse(paginationHeader ?? '');
        this.initPaginationParams(xpagination);
        return products;
      })
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
            this.router.navigate(['/product']);
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          timeOut: 3000,
        });
      },
    });
    localStorage.setItem('barcode', '');
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
            this.router.navigate(['/product']);
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          timeOut: 3000,
        });
      },
    });
    localStorage.setItem('barcode', '');
  }

  getBarcode(): Observable<string> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<string>(this.baseUrl + 'barcodes/random', {
      headers,
    });
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
