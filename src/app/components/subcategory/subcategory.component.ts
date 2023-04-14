import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Pagination } from 'src/app/models/Pagination';
import { Subcategory } from 'src/app/models/Subcategory';
import { CategoryService } from 'src/app/services/category/category.service';
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {
  subcategories: Observable<Subcategory[]> | undefined;
  categories: Category[] = [];
  nameField: any;
  subcategory: any;
  nameValid: boolean = false;
  public pagination: Pagination | undefined;

  constructor(private subcategoryService: SubcategoryService,           
              private formBuilder: FormBuilder,
              private categoryService: CategoryService){}

  ngOnInit(): void {
    this.subcategories = this.subcategoryService.getPaged(1);
    this.categoryService.getAll().subscribe(data => this.categories = data);
    this.pagination = this.subcategoryService.pagination;
  }
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  categoryId = new FormControl('', [
    Validators.required,
    Validators.nullValidator
  ]);

  public addNewForm = this.formBuilder.group({
    name: this.name,
    categoryId: this.categoryId
  });

  add() {
    this.subcategoryService.add(this.addNewForm.getRawValue());
  }

  remove(id: number) {
    this.subcategoryService.remove(id);
  }

  archive(id: number) {
    this.subcategoryService.archive(id);
  }

  openEditModal(model: Subcategory) {
      this.subcategory = model;
      var name = document.getElementById('categoryName');
      name?.setAttribute('value', model.name);

      var select = document.getElementById('category') as HTMLSelectElement;
      var option;

      for (var i=0; i<select!.options.length; i++) {
        option = select!.options[i];

        if (option.value == model.categoryId.toString()) {
          option.setAttribute('selected', 'true');
        } 
      }
  }

  check() {
    var name = (document.getElementById('categoryName') as HTMLInputElement).value;
    if (name == null || name == "" || name.length < 3) {
      this.nameValid = false;
    }
    else {
      this.nameValid = true;
    }
  }

  edit() {
    this.subcategory.name = (document.getElementById('categoryName') as HTMLInputElement).value;
    var select = document.getElementById('category') as HTMLSelectElement;
      var option;

      for (var i=0; i<select!.options.length; i++) {
        option = select!.options[i];
        if (option.value == this.subcategory.categoryId.toString()) {
          this.subcategory.categoryId = Number(option.value)
        } 
      }
    this.subcategoryService.edit(this.subcategory)
  }

  paging(pageNumber: number) {
    this.subcategories = this.subcategoryService.getPaged(pageNumber);
    this.pagination = this.subcategoryService.pagination;
  }
}
