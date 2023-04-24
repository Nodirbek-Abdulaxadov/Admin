import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/Product';
import { Warehouse } from 'src/app/models/warehouse';
import { ProductService } from 'src/app/services/product/product.service';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { WarehouseItemService } from 'src/app/services/warehouseItem/warehouse-item.service';

@Component({
  selector: 'app-new-warehouse-item',
  templateUrl: './new-warehouse-item.component.html',
  styleUrls: ['./new-warehouse-item.component.css'],
})
export class NewWarehouseItemComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private warehouseItemService: WarehouseItemService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  warehouses: Warehouse[] = [];
  products: Product[] = [];
  selectedProduct: Product = {
    id: 0,
    name: '',
    description: '',
    madeIn: '',
    barcode: '',
    warningCount: 0,
    subcategoryId: 0,
    subcategoryName: '',
    categoryId: 0,
    categoryName: '',
    adminId: '',
    adminFullName: '',
    addedDate: new Date(),
    modifiedDate: new Date()
  };

  ngOnInit(): void {
    this.warehouseService.getAll().subscribe((data) => {
      this.warehouses = data;
    });
    this.productService.getAll().subscribe((data) => this.products = data);
    this.checkProductId();
  }

  quantity = new FormControl(0, [
    Validators.required
  ]);

  broughtDate = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  incomingPrice = new FormControl(0, [
    Validators.required,
  ]);

  sellingPrice = new FormControl(0, [
    Validators.required,
  ]);

  productId = new FormControl(0, [
    Validators.required,
    Validators.nullValidator,
  ]);

  adminId = new FormControl('');

  warehouseId = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  public addNewForm = this.formBuilder.group({
    quantity: this.quantity,
    broughtDate: this.broughtDate,
    incomingPrice: this.incomingPrice,
    sellingPrice: this.sellingPrice,
    productId: this.productId,
    adminId: this.adminId,
    warehouseId: this.warehouseId
  });

  focusOnScan() {
    var element = document.getElementById('barcodeInput') as HTMLInputElement;
    element.focus();
  }

  scanned(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var barcode = document.getElementById('barcodeInput') as HTMLInputElement;
      var product = this.products.filter(p => p.barcode == barcode.value)[0];
      this.selectProduct(product.id);
    }
  }

  clearbarcode() {
    var input = document.getElementById('barcodeInput') as HTMLInputElement;
    input.value = '';
    this.clearProductSelection();
    this.checkProductId();
  }

  clearsearch() {
    var input = document.getElementById('productSearchText') as HTMLInputElement;
    input.value = '';
    this.clearProductSelection();
    this.checkProductId();  
  }

  clearProductSelection() {
    var input = document.getElementById('pname') as HTMLInputElement;
    input.innerText = '';
    input = document.getElementById('pmadeIn') as HTMLInputElement;
    input.innerText = '';
    input = document.getElementById('pcategoryName') as HTMLInputElement;
    input.innerText = '';
    input = document.getElementById('psubcategoryName') as HTMLInputElement;
    input.innerText = '';
    input = document.getElementById('description') as HTMLInputElement;
    input.innerText = '';
    this.cancelSelection();
  }

  selectProduct(id: number){
    this.productService.getById(id).subscribe(data => {
      this.selectedProduct = data;
      this.addNewForm.controls.productId.setValue(id);
      this.setInformations();
      this.checkProductId();
    });
  }

  selectByName() {
    var input = document.getElementById('productSearchText') as HTMLInputElement;
    var product = this.products.filter(p => p.name == input.value)[0];
    this.selectProduct(product.id);
  }

  cancelSelection() {
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      madeIn: '',
      barcode: '',
      warningCount: 0,
      subcategoryId: 0,
      subcategoryName: '',
      categoryId: 0,
      categoryName: '',
      adminId: '',
      adminFullName: '',
      addedDate: new Date(),
      modifiedDate: new Date()
    };
  }

  setInformations() {
    var input = document.getElementById('pname') as HTMLInputElement;
    input.innerText = this.selectedProduct.name;
    input = document.getElementById('pmadeIn') as HTMLInputElement;
    input.innerText = this.selectedProduct.madeIn;
    input = document.getElementById('pcategoryName') as HTMLInputElement;
    input.innerText = this.selectedProduct.categoryName;
    input = document.getElementById('psubcategoryName') as HTMLInputElement;
    input.innerText = this.selectedProduct.subcategoryName;
    input = document.getElementById('description') as HTMLInputElement;
    input.innerText = this.selectedProduct.description;
  }

  checkProductId() {
    var message = document.getElementById('productIdErrorMessage') as HTMLHeadingElement;
    if (this.selectedProduct.id == 0) {
      message.classList.remove('d-none')
    }
    else {
      message.classList.add('d-none');
    }
  }

  add() {
    this.warehouseItemService.add(this.addNewForm.getRawValue());
  }
}
