import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit{
  warehouses: Observable<Warehouse[]> | undefined;
  nameField: any;
  warehouse: any;
  nameValid: boolean = false;
  pageNumbers = new Array();
  public pagination: Pagination | undefined;

  constructor(private warehouseService: WarehouseService,           
              private formBuilder: FormBuilder,){}

  ngOnInit(): void {
    this.warehouses = this.warehouseService.getPaged(1);
    this.pagination = this.warehouseService.pagination;
  }
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  public addWarehouseForm = this.formBuilder.group({
    name: this.name
  });

  addNew() {
    this.warehouseService.add(this.addWarehouseForm.getRawValue());
  }

  remove(id: number) {
    this.warehouseService.remove(id);
  }

  archive(id: number) {
    this.warehouseService.archive(id);
  }

  openEditModal(model: Warehouse) {
      this.warehouse = model;
      var name = document.getElementById('warehouseName');
      name?.setAttribute('value', model.name);
  }

  check() {
    var name = (document.getElementById('warehouseName') as HTMLInputElement).value;
    if (name == null || name == "" || name.length < 3) {
      this.nameValid = false;
    }
    else {
      this.nameValid = true;
    }
  }

  edit() {
    this.warehouse.name = (document.getElementById('warehouseName') as HTMLInputElement).value;
    this.warehouseService.edit(this.warehouse)
  }

  paging(pageNumber: number) {
    this.warehouses = this.warehouseService.getPaged(pageNumber);
    this.pagination = this.warehouseService.pagination;
  }
}
