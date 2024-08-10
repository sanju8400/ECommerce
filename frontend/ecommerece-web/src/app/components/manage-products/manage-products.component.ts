import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  newProduct: any = {
    id:'',
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    stock: 0,
    imageUrl: '',
    brand: '',
    category:null,
  };
  editProductForm: any = null;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }
  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addProduct(): void {
   
    if (this.editProductForm) {
      this.updateProduct();
    } else {
      this.newProduct.category = this.categories.find(x => x.id == this.newProduct.categoryId);

      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.getProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: any): void {
    this.editProductForm = { ...product };
  }

  updateProduct(): void {
    if (this.editProductForm) {
      this.editProductForm.category = this.categories.find(x => x.id == this.editProductForm.categoryId);
      this.productService.updateProduct(this.editProductForm).subscribe(() => {
        this.getProducts();
        this.resetForm();
      });
    }
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.getProducts();
    });
  }

  resetForm(): void {
    this.editProductForm = null;
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      categoryId: '',
      stock: 0,
      imageUrl: '',
      brand: '',
      category:null
    };
  }

  cancelEdit(): void {
    this.resetForm();
  }
}
