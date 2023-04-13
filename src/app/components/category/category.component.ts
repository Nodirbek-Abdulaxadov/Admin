import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Pagination } from 'src/app/models/Pagination';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Observable<Category[]> | undefined;
  nameField: any;
  category: any;
  nameValid: boolean = false;
  public pagination: Pagination | undefined;

  constructor(private categoryService: CategoryService,           
              private formBuilder: FormBuilder,){}

  ngOnInit(): void {
    this.categories = this.categoryService.getPaged(1);
    this.pagination = this.categoryService.pagination;
  }
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  public addNewForm = this.formBuilder.group({
    name: this.name
  });

  add() {
    this.categoryService.add(this.addNewForm.getRawValue());
  }

  remove(id: number) {
    this.categoryService.remove(id);
  }

  archive(id: number) {
    this.categoryService.archive(id);
  }

  openEditModal(model: Category) {
      this.category = model;
      var name = document.getElementById('categoryName');
      name?.setAttribute('value', model.name);
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
    this.category.name = (document.getElementById('categoryName') as HTMLInputElement).value;
    this.categoryService.edit(this.category)
  }

  paging(pageNumber: number) {
    this.categories = this.categoryService.getPaged(pageNumber);
    this.pagination = this.categoryService.pagination;
  }
}