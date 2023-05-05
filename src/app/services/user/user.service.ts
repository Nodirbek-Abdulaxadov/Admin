import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../helpers/token.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  baseUrl: string = Constants.BASE_URL + 'users/';

  getAll(role: string): Observable<User[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get<User[]>(this.baseUrl + role, { headers });
  }

  add(form: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient
      .post(Constants.BASE_URL + 'auth/register', form, { headers })
      .subscribe({
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

  edit(form: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    this.httpClient.put(Constants.BASE_URL + 'auth/update', form, { headers }).subscribe({
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

  getToken() {
    var localdata = localStorage.getItem('data');
    var json = JSON.parse(localdata ?? '');
    return json['Token'];
  }
}
