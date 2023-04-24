import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../helpers/token.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
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

    
  getToken() {
    var localdata = localStorage.getItem('data');
    var json = JSON.parse(localdata ?? '');
    return json['Token'];
  }
  }