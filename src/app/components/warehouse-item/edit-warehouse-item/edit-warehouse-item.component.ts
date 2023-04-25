import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/Product';
import { WarehouseItem } from 'src/app/models/WarehouseItem';
import { Warehouse } from 'src/app/models/warehouse';
import { ProductService } from 'src/app/services/product/product.service';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { WarehouseItemService } from 'src/app/services/warehouseItem/warehouse-item.service';

@Component({
  selector: 'app-edit-warehouse-item',
  templateUrl: './edit-warehouse-item.component.html',
  styleUrls: ['./edit-warehouse-item.component.css']
})
export class EditWarehouseItemComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private warehouseItemService: WarehouseItemService,
    private productService: ProductService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute
  ) {}

  warehouses: Warehouse[] = [];
  products: Product[] = [];
  warehouseItemId: number = 0;
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
    quantity: 0,
    categoryName: '',
    adminId: '',
    adminFullName: '',
    addedDate: new Date(),
    modifiedDate: new Date()
  };
  warehouseItem: WarehouseItem = {
    id: this.warehouseItemId,
    quantity: 0,
    broughtDate: new Date(),
    incomingPrice: 0,
    sellingPrice: 0,
    adminId: '',
    adminFullName: '',
    addedDate: new Date(),
    modifiedDate: new Date(),
    productId: 0,
    productName: '',
    warehouseId: 0,
    warehouseName: ''
  }

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.warehouseItemId = Number(routeParams.get('warehouseItemId')??"");
    this.warehouseItemService.getById(this.warehouseItemId).subscribe(data => {
      this.warehouseItem = data;
      this.selectProduct(this.warehouseItem.productId);
    });
    this.warehouseService.getAll().subscribe((data) => {
      this.warehouses = data;
    });
    this.productService.getAll().subscribe((data) => this.products = data);
  }

  id = new FormControl(this.warehouseItemId);

  quantity = new FormControl(this.warehouseItem.quantity, [
    Validators.required
  ]);

  broughtDate = new FormControl(this.warehouseItem.broughtDate, [
    Validators.required,
    Validators.nullValidator,
  ]);

  incomingPrice = new FormControl(this.warehouseItem.incomingPrice, [
    Validators.required,
  ]);

  sellingPrice = new FormControl(this.warehouseItem.sellingPrice, [
    Validators.required,
  ]);

  productId = new FormControl(this.warehouseItem.productId, [
    Validators.required,
    Validators.nullValidator,
  ]);

  adminId = new FormControl(this.warehouseItem.adminId);

  warehouseId = new FormControl(this.warehouseItem.warehouseId.toString(), [
    Validators.required,
    Validators.nullValidator,
  ]);

  public editForm = this.formBuilder.group({
    id: this.warehouseItemId,
    quantity: this.quantity,
    broughtDate: this.broughtDate,
    incomingPrice: this.incomingPrice,
    sellingPrice: this.sellingPrice,
    productId: this.productId,
    adminId: this.adminId,
    warehouseId: this.warehouseId,
    addedDate: new Date(),
    modifiedDate: new Date()
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
      this.editForm.controls.productId.setValue(id);
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
      quantity: 0,
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
    input = document.getElementById('productSearchText') as HTMLInputElement;
    input.value = this.selectedProduct.name;
    input = document.getElementById('barcodeInput') as HTMLInputElement;
    input.value = this.selectedProduct.barcode;
    input = document.getElementById('pmadeIn') as HTMLInputElement;
    input.innerText = this.selectedProduct.madeIn;
    input = document.getElementById('pcategoryName') as HTMLInputElement;
    input.innerText = this.selectedProduct.categoryName;
    input = document.getElementById('psubcategoryName') as HTMLInputElement;
    input.innerText = this.selectedProduct.subcategoryName;
    input = document.getElementById('description') as HTMLInputElement;
    input.innerText = this.selectedProduct.description;

    this.editForm.controls.warehouseId.setValue(this.warehouseItem.warehouseId.toString());
    input = document.getElementById('incomingPriceInput') as HTMLInputElement;
    input.value = this.warehouseItem.incomingPrice.toString();
    this.editForm.controls.incomingPrice.setValue(this.warehouseItem.incomingPrice);
    input = document.getElementById('sellingPriceInput') as HTMLInputElement;
    input.value = this.warehouseItem.sellingPrice.toString();
    this.editForm.controls.sellingPrice.setValue(this.warehouseItem.sellingPrice);
    
    input = document.getElementById('quantityInput') as HTMLInputElement;
    input.value = this.warehouseItem.quantity.toString();
    this.editForm.controls.quantity.setValue(this.warehouseItem.quantity);

    input = document.getElementById('broughtDateInput') as HTMLInputElement;
    input.value = this.warehouseItem.broughtDate.toString();
    this.editForm.controls.broughtDate.setValue(this.warehouseItem.broughtDate);
    this.editForm.controls.id.setValue(this.warehouseItem.id);
    this.editForm.controls.warehouseId.setValue(this.warehouseItem.warehouseId.toString());
    this.editForm.controls.addedDate.setValue(this.warehouseItem.addedDate);
    this.editForm.controls.modifiedDate.setValue(this.warehouseItem.modifiedDate);
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



  update() {
    this.warehouseItemService.edit(this.editForm.getRawValue());
  }
}