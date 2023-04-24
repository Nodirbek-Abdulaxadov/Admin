import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { Pagination } from 'src/app/models/Pagination';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Observable<Customer[]> | undefined;
  pagination: Pagination | undefined;
  public fullNameIsvalid: boolean = true;
  public phoneNumberIsValid: boolean = true;

  customer: Customer = {
    id: 0,
    fullName: '',
    phoneNumber: '',
    addedDate: new Date(),
    modifedDate: new Date()
  }

  constructor(private customerService: CustomerService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.paging(1);
  }

  fullName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(15)
  ]);

  public addNewForm = this.formBuilder.group({
    fullName: this.fullName,
    phoneNumber: this.phoneNumber
  });

  paging(pageNumber: number) {
    this.customers = this.customerService.getPaged(pageNumber);
    this.pagination = this.customerService.pagination;
  }

  add() {
    this.customerService.add(this.addNewForm.getRawValue());
  }

  openEditModal(item: Customer) {
    this.customer = item;
    var input = document.getElementById('fullName') as HTMLInputElement;
    input.value = item.fullName;
    input = document.getElementById('phoneNumber') as HTMLInputElement;
    input.value = item.phoneNumber;

    this.fullNameIsvalid = true;
    this.phoneNumberIsValid = true;
  }

  edit() {
    var input = document.getElementById('fullName') as HTMLInputElement;
    this.customer.fullName = input.value;
    input = document.getElementById('phoneNumber') as HTMLInputElement;
    this.customer.phoneNumber = input.value;
    this.customerService.edit(this.customer);
  }

  checkFullName() {
    var input = document.getElementById('fullName') as HTMLInputElement;
    if (input.value.length >= 3 && input.value.length <= 100) {
      this.fullNameIsvalid = true;
    }
    else {
      this.fullNameIsvalid = false;
    }
  }
  checkPhoneNumber() {
    var input = document.getElementById('phoneNumber') as HTMLInputElement;
    if (input.value.length >= 3 && input.value.length <= 100) {
      this.phoneNumberIsValid = true;
    }
    else {
      this.phoneNumberIsValid = false;
    }
  }

  remove(id: number) {
    this.customerService.remove(id);
  }
}