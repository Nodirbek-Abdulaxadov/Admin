import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './pages/login/login.service';
import { Router } from '@angular/router';
import { TokenService } from './services/helpers/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Admin';
  userName: string = "";
  role: string = "";


  constructor(private loginService: LoginService,
              private router: Router,
              private tokenService: TokenService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.userName = this.tokenService.getFullname();
    this.role = this.tokenService.getRole();
  }

  ngAfterViewInit(): void {
    this.loginService.refreshToken();
  }

  userLogged(): boolean {
    var localdata = localStorage.getItem('data');
    if (localdata != null && localdata != '') {
      try {
        if (this.tokenService.getRole() == "SELLER") {
          return false;
        }
      }
      catch (error){
        this.logout();
      }
      return true;
    }
    else {
      return false;
    }
  }
  
  logout() {
      localStorage.clear();
      this.toastr.error("Token expired!");
      this.router.navigate(['/']);
  }
}
