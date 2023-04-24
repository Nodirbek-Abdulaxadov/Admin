import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { WarehouseItem } from 'src/app/models/WarehouseItem';
import { WarehouseItemService } from 'src/app/services/warehouseItem/warehouse-item.service';

@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.css']
})
export class WarehouseItemComponent implements OnInit {
  warehouseItems: Observable<WarehouseItem[]> | undefined;
  pagination: Pagination | undefined;
  warehouse: WarehouseItem = {
    id: 0,
    quantity: 0,
    broughtDate: new Date(),
    incomingPrice: 0,
    sellingPrice: 0,
    productId: 0,
    productName: '',
    warehouseId: 0,
    warehouseName: '',
    adminId: '',
    adminFullName: '',
    addedDate: new Date(),
    modifiedDate: new Date()
  };

  constructor(private warehouseItemService: WarehouseItemService) {}

  ngOnInit(): void {
    this.paging(1);
  }

  onProductSelect(warehouse: WarehouseItem) {
    this.warehouse = warehouse;
  }

  remove(id: number) {
    this.warehouseItemService.remove(id);
  }

  paging(pageNumber: number) {
    this.warehouseItems = this.warehouseItemService.getPaged(pageNumber);
    this.pagination = this.warehouseItemService.pagination;
  }
}