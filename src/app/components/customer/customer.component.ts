import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  public page: number = 1;

  customer: Customer = {
    id: 0,
    fullName: '',
    phoneNumber: '',
    addedDate: new Date(),
    modifedDate: new Date()
  }

  constructor(private customerService: CustomerService,
              private formBuilder: FormBuilder,
              private actRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.page = Number(routeParams.get('page')??1);
    this.paging(this.page);
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
    this.page = Math.round(pageNumber);

    if (pageNumber > this.customerService.pagination.CurrentPage && pageNumber > 3) {
      pageNumber -= 1;
    }
    else if (pageNumber < this.customerService.pagination.CurrentPage && pageNumber > 3) {
      pageNumber += 1;
    }

    this.customers = this.customerService.getPaged(this.page);
    this.pagination = this.customerService.pagination;
    this.router.navigate(['/customers', this.page]);
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