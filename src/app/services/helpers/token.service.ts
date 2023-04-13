import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getFullname() {
    var localdata = localStorage.getItem('data');
      var json = JSON.parse(localdata??"");
      return json["FullName"];
  }

  getUserId() {
    console.log(this.getDecodedAccessToken())
    return this.getDecodedAccessToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  getPhoneNumber() {
    return this.getDecodedAccessToken().sub;
  }

  getRole() {
    return this.getDecodedAccessToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getDecodedAccessToken(): any {
    try {
      var localdata = localStorage.getItem('data');
      var json = JSON.parse(localdata??"");
      var token = json["Token"];
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
