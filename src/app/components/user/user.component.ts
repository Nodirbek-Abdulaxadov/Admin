import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
              private formBuilder: FormBuilder){}

  count: number = 0;
  users: Observable<User[]> | undefined;

  ngOnInit(): void {
    this.users = this.userService.getAll('admins');
  }

  fullName = new FormControl('',[
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)
  ])

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(15)
  ])

  public addnewForm = this.formBuilder.group({
    fullName: this.fullName,
    phoneNumber: this.phoneNumber
  });


  addNew() {
    console.log(this.addnewForm.getRawValue())
  }
}
