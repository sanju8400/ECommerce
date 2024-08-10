import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  cart: any[] = [];
  total = 0;
  userDetails: any = {};

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
    this.total = this.getTotalAmount();
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);
      this.userDetails.id = "";
      this.userDetails.total = this.total.toFixed(3);
      this.userDetails.productDetails = this.cart;
      console.log(this.userDetails);

      // Save order to the server
      this.orderService.saveOrder(this.userDetails).subscribe(
        response => {
          localStorage.removeItem('cartItems');
          localStorage.removeItem('userDetails');
          alert('Order saved successfully:');
        },
        error => {
          alert('Error saving order:');
          console.error('Error saving order:', error);
        }
      );
    }
  }
 
  getTotalAmount(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
