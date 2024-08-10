import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  formData = {
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    zip: ''
  };

  constructor(private router: Router,) { }

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.address && this.formData.phone && this.formData.city && this.formData.zip) {
      console.log('Order submitted', this.formData);
      localStorage.setItem('userDetails', JSON.stringify(this.formData));
      this.router.navigate(['/order-summary']);
    } else {
      console.log('Form is invalid');
    }
  }
}
