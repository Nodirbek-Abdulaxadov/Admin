import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/models/Constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = Constants.BASE_URL + "auth/"

  date1: Date = new Date();
  date2: Date = new Date();

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService,
              private router: Router) { }

  refreshToken() {
      var localdata = localStorage.getItem('data');
      var json = JSON.parse(localdata??"");
      var token = json["Token"];
      var expiresAt = localStorage.getItem('loggedDate');
      this.date1 = new Date(expiresAt??"");
      if (this.date2.getDay() - this.date1.getDay() > 0 || expiresAt == null) {
        var refreshToken = json["RefreshToken"];
        var body = {
          "token": token,
          "refreshToken": refreshToken
        }

        this.httpClient.post(this.url+'refresh-user', body, {withCredentials: true}).subscribe(
              { next: data => {
                  localStorage.clear();
                  localStorage.setItem("data", JSON.stringify(data));
                  localStorage.setItem('loggedDate', this.date2.toString())
                  this.toastr.success("Token updated!")
              },
              error: error => {
                switch(error.status) {
                  case 400: {
                    localStorage.clear();
                    this.toastr.error("Bad request!")
                  }break;
                  case 401: {
                    localStorage.clear();
                    this.toastr.error("Token expired!")
                  } break;
                }
              }}
          );
      }
  }


  login(form: any) {
    console.log(form);
    this.httpClient.post(this.url +'login', form, {withCredentials: true}).subscribe(
      { next: data => {
           localStorage.setItem("data", JSON.stringify(data));
           this.toastr.success('Successfully logged in!');
           localStorage.setItem('loggedDate', this.date2.toString())
           //this.router.navigate(['/']);
       },
       error: error => {
         console.log(error);
           switch(error.status) {
             case 400: {
              this.toastr.error("Nimadir xato!");
             }break;
             case 401: 
             this.toastr.error("Telefon raqam yoki parol noto'g'ri kiritilgan!"); break;
             //case 0: this.router.navigate(['/server-error']); break;
           }
       }}
   );
  }
}
