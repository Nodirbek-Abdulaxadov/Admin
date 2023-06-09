import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Constants } from 'src/app/models/Constants';
import { Pagination } from 'src/app/models/Pagination';
import { Subcategory } from 'src/app/models/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  constructor(private httpClient: HttpClient, 
              private toastr: ToastrService) {}

  baseUrl: string = Constants.BASE_URL + "subcategory/";

  public pagination: Pagination = {
    HasPrevious: false,
    HasNext: false,
    TotalCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    TotalPages: 0,
  };

  getAll(): Observable<Subcategory[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<Subcategory[]>(this.baseUrl, { headers });
  }

  getPaged(pageNumber: number): Observable<Subcategory[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    const url = `${this.baseUrl}paged?pageSize=5&pageNumber=${pageNumber}`;

    return this.httpClient.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        const warehouses = response.body as Subcategory[];
        const paginationHeader = response.headers.get('x-pagination');
        var xpagination = JSON.parse(paginationHeader ?? '');
        this.initPaginationParams(xpagination);
        return warehouses;
      })
    );
  }

  add(form: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient.post(this.baseUrl, form, { headers }).subscribe({
      next: (data) => {
        this.toastr
          .success("Muvofaqqiyatli qo'shildi!")
          .onHidden.subscribe(() => {
            window.location.reload();
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          timeOut: 3000,
        });
      },
    });
  }

  edit(subcategory: Subcategory) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient.put(this.baseUrl, subcategory, { headers }).subscribe({
      next: (data) => {
        this.toastr
          .success('Muvofaqqiyatli saqlandi!')
          .onHidden.subscribe(() => {
            window.location.reload();
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
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient.delete(this.baseUrl + id, { headers }).subscribe({
      next: (data) => {
        this.toastr
          .success("Muvofaqqiyatli o'chirildi!")
          .onHidden.subscribe(() => {
            window.location.reload();
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          timeOut: 3000,
        });
      },
    });
  }

  archive(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient.put(this.baseUrl + 'archive/' + id, { headers }).subscribe({
      next: (data) => {
        this.toastr
          .success('Muvofaqqiyatli arxivlandi!')
          .onHidden.subscribe(() => {
            window.location.reload();
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          easeTime: 3000,
        });
      },
    });
  }

  recover(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient.put(this.baseUrl + 'recover/' + id, { headers }).subscribe({
      next: (data) => {
        this.toastr
          .success('Muvofaqqiyatli arxivlandi!')
          .onHidden.subscribe(() => {
            window.location.reload();
          });
      },
      error: (error) => {
        this.toastr.error('Qandaydir xatolik yuz berdi!', '', {
          easeTime: 3000,
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
