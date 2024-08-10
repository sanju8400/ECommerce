import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  categories: any[] = [];
  currentCategory: any = { id: '', name: '' };
  editCategoryForm: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  saveCategory(): void {
    if (this.editCategoryForm) {
      // Update category
      this.categoryService.updateCategory(this.currentCategory).subscribe(() => {
        this.getCategories();
        this.resetForm();
      });
    } else {
      // Add new category
      this.categoryService.addCategory(this.currentCategory).subscribe(() => {
        this.getCategories();
        this.resetForm();
      });
    }
  }

  editCategory(category: any): void {
    this.currentCategory = { ...category };
    this.editCategoryForm = true;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteCategory(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.getCategories();
    });
  }

  private resetForm(): void {
    this.currentCategory = { id: '', name: '' };
    this.editCategoryForm = false;
  }
}
