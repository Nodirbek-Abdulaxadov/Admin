import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/models/Constants';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private userService: UserService,
              private formBuilder: FormBuilder){}

  count: number = 0;
  users: Observable<User[]> | undefined;

  ngOnInit(): void {
    this.users = this.userService.getAll('sellers');
  }

  user: User = {
    id: '',
    fullName: '',
    phoneNumber: '',
    role: ''
  }

  fullName = new FormControl('',[
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)
  ]);

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(15)
  ]);

  public addnewForm = this.formBuilder.group({
    fullName: this.fullName,
    phoneNumber: this.phoneNumber,
    password: Constants.DEFAULT_PASSWORD,
    userRole: "SELLER"
  });

  public editForm = this.formBuilder.group({
    id: '',
    fullName: this.fullName,
    phoneNumber: this.phoneNumber,
    password: Constants.DEFAULT_PASSWORD,
    userRole: "SELLER"
  });

  addNew() {
    this.userService.add(this.addnewForm.getRawValue());
  }

  openEditModal(model: User) {
    this.user = model;
    var input = document.getElementById('fullName') as HTMLInputElement;
    input.value = model.fullName;
    input = document.getElementById('phoneNumber') as HTMLInputElement;
    input.value = model.phoneNumber;
  }

  checkFullName() {
    var input = document.getElementById('fullName') as HTMLInputElement;
    return input.value.length > 3;
  }

  checkPhoneNumber() {
    var input = document.getElementById('phoneNumber') as HTMLInputElement;
    return input.value.length > 9;
  }


  edit() {
    var input = document.getElementById('fullName') as HTMLInputElement;
    this.editForm.controls.fullName.setValue(input.value);
    input = document.getElementById('phoneNumber') as HTMLInputElement;
    this.editForm.controls.phoneNumber.setValue(input.value);
    this.editForm.controls.id.setValue(this.user.id);
    this.userService.edit(this.editForm.getRawValue());
  }
}