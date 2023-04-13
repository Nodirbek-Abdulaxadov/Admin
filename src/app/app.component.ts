import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './pages/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Admin';
  constructor(private loginService: LoginService,
              private router: Router){}

  ngAfterViewInit(): void {
    this.loginService.refreshToken();
  }

  userLogged(): boolean {
    var localdata = localStorage.getItem('data');
    if (localdata != null && localdata != '') {
      return true;
    }
    else {
      return false;
    }
  }
  
  logout() {
      localStorage.clear();
      this.router.navigate(['/']);
  }
}
