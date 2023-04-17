import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { Subcategory } from 'src/app/models/Subcategory';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, AfterViewInit {
  constructor(private formBuilder: FormBuilder,
              private subcategoryService: SubcategoryService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private toastr: ToastrService) {}
  ngAfterViewInit(): void {
    
    if (this.getSavedBarcode()!.length > 10) {
      this.setBarcode(this.getSavedBarcode()!)
      this.addNewForm.controls.barcode.setValue(this.getSavedBarcode()!);
  }
  }

  subcategories: Subcategory[] = [];
  subcategoriesFilter: Subcategory[] = [];
  categories: Category[] = [];
  barcodeIsClean: boolean = true;

  ngOnInit(): void {
    this.subcategoryService.getAll().subscribe(data => {
      this.subcategories = data;
      this.subcategoriesFilter = data;
    });
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  description = new FormControl('', [
    Validators.maxLength(200),
  ]);

  madeIn = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(60),
  ]);

  barcode = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]);

  warningCount = new FormControl(0, [
    Validators.required
  ]);

  adminId = new FormControl('');


  categoryId = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  subcategoryId = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  public addNewForm = this.formBuilder.group({
    name: this.name,
    categoryId: this.categoryId,
    subcategoryId: this.subcategoryId,
    description: this.description,
    madeIn: this.madeIn,
    barcode: this.barcode,
    warningCount: this.warningCount,
    adminId: this.adminId
  });

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
    var categoryId = this.addNewForm.getRawValue().categoryId;
    this.subcategoriesFilter = this.subcategories.filter(s => s.categoryId == Number(categoryId))
  }

  add() {
    this.productService.add(this.addNewForm.getRawValue())
  }

  randomBarcode() {
    this.productService.getBarcode().subscribe(data => {
      if (data) {
        this.setBarcode(data)
        this.addNewForm.controls.barcode.setValue(data.toString());
        this.toastr.success("Barcode yaratildi!");
        this.saveBarcode(data);
      }
      else {
        this.toastr.error("Xatolik yuz berdi!");
      }
    });
  }

  getCurrentBarcode() {
    return this.addNewForm.controls.barcode.value;
  }

  clearBarcode() {
    var src = 'assets/images/barcode0.png';
    var barcodeimg = document.getElementById('barcode') as HTMLImageElement
    barcodeimg.src = src;
    this.addNewForm.controls.barcode.setValue('');
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
