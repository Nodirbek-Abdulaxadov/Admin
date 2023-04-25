import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Subcategory } from 'src/app/models/Subcategory';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {}

  subcategories: Subcategory[] = [];
  subcategoriesFilter: Subcategory[] = [];
  subCategoryId: number = 0;
  CategoryId: number = 0;
  categories: Category[] = [];
  barcodeIsClean: boolean = true;
  firstInit: boolean = false;
  product: Product = {
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
  productId: number = 0;

  ngOnInit(): void {
    const routeParams = this.actRoute.snapshot.paramMap;
    this.productId = Number(routeParams.get('productId')??"");
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    this.productService.getById(this.productId).subscribe(data => {
      this.product = data;
      this.setBarcode(this.product.barcode);
      this.editForm.controls.categoryId.setValue(data.categoryId);
      this.editForm.controls.subcategoryId.setValue(data.subcategoryId);    
    });
    this.subcategoryService.getAll().subscribe(data => {
      this.subcategories = data;
      this.subcategoriesFilter = this.subcategories;
    });
  }

  id = new FormControl(this.productId);

  name = new FormControl(this.product.name, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  description = new FormControl(this.product.description, [
    Validators.maxLength(200),
  ]);

  madeIn = new FormControl(this.product.madeIn, [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(60),
  ]);

  barcode = new FormControl(this.product.barcode, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]);

  warningCount = new FormControl(this.product.warningCount, [
    Validators.required
  ]);

  adminId = new FormControl(this.product.adminId);


  categoryId = new FormControl(this.product.categoryId, [
    Validators.required,
    Validators.nullValidator,
  ]);

  subcategoryId = new FormControl(this.product.subcategoryId, [
    Validators.required,
    Validators.nullValidator,
  ]);

  public editForm = this.formBuilder.group({
    id: this.productId,
    name: this.name,
    categoryId: this.categoryId,
    subcategoryId: this.subcategoryId,
    description: this.description,
    madeIn: this.madeIn,
    barcode: this.barcode,
    warningCount: this.warningCount,
    adminId: this.adminId
  });

  update() {
    var barcodeInput = document.getElementById('barcodeInput') as HTMLInputElement;
    var name = document.getElementById('name') as HTMLInputElement;
    var description = document.getElementById('description') as HTMLInputElement;
    var madeIn = document.getElementById('madeIn') as HTMLInputElement;
    var warningCount = document.getElementById('warningCount') as HTMLInputElement;
    this.editForm.controls.barcode.setValue(barcodeInput.value);
    this.editForm.controls.name.setValue(name.value);
    this.editForm.controls.description.setValue(description.value);
    this.editForm.controls.madeIn.setValue(madeIn.value);
    this.editForm.controls.warningCount.setValue(Number(warningCount.value));
    this.editForm.controls.id.setValue(this.productId);
    if (this.editForm.controls.categoryId.value == 0) {
      this.editForm.controls.categoryId.setValue(this.CategoryId);
      this.editForm.controls.subcategoryId.setValue(this.subCategoryId);
    }
    
    this.productService.edit(this.editForm.getRawValue());
  }


  focusOnScan() {
    var element = document.getElementById('barcodeInput') as HTMLInputElement;
    element.focus();
    this.saveBarcode('');
  }

  scanned(event: any) {
    if(event.keyCode === 13){
      event.preventDefault();
      var barcode = document.getElementById('barcodeInput') as HTMLInputElement;
      this.setBarcode(barcode.value)
    }
  }

  categorySelected() {
    var categoryId = this.editForm.getRawValue().categoryId;
    this.subcategoriesFilter = this.subcategories.filter(s => s.categoryId == Number(categoryId))
    this.CategoryId = Number((document.getElementById('category') as HTMLSelectElement).value);
  }

  subcategorySelected() {
    this.subCategoryId = Number((document.getElementById('subcategory') as HTMLSelectElement).value);
  }

  randomBarcode() {
    this.productService.getBarcode().subscribe(data => {
      if (data) {
        this.setBarcode(data)
        this.editForm.controls.barcode.setValue(data.toString());
        this.toastr.success("Barcode yaratildi!");
        this.saveBarcode(data);
      }
      else {
        this.toastr.error("Xatolik yuz berdi!");
      }
    });
  }

  getCurrentBarcode() {
    return this.editForm.controls.barcode.value;
  }

  clearBarcode() {
    var src = 'assets/images/barcode0.png';
    var barcodeimg = document.getElementById('barcode') as HTMLImageElement
    barcodeimg.src = src;
    this.editForm.controls.barcode.setValue('');
    this.saveBarcode('');
  }

  setBarcode(barcode: string) {
    var barcodeImgUrl = 'https://barcodeapi.org/api/128/';
    var barcodeimg = document.getElementById('barcode') as HTMLImageElement
    barcodeimg.src = barcodeImgUrl + barcode;
    this.saveBarcode(barcode);
  }

  saveBarcode(barcode: string) {
    localStorage.setItem('barcode', barcode);
  }

  getSavedBarcode() {
    return localStorage.getItem('barcode')
  }
}
