import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      const catList = products.map(p => p.category).map(p => (p?.name ?? ""));
      this.categories = ['All', ...new Set(catList)];
      this.loadCart();
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category?.name === this.selectedCategory);
    }
  }

  addToCart(product: Product): void {
    const cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  increaseQuantity(item: { product: Product, quantity: number }): void {
    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(item: { product: Product, quantity: number }): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.cartItems = this.cartItems.filter(i => i.product.id !== item.product.id);
    }
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  loadCart(): void {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }
  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
