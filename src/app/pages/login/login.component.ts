import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService){}

    phoneNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(13)
    ]);
    password = new FormControl('', [
      Validators.required,
    ]);
  
    public loginForm = this.formBuilder.group({
      phoneNumber: this.phoneNumber,
      password: this.password
    });

    login() {
      this.loginService.login(this.loginForm.getRawValue());
    }
}
