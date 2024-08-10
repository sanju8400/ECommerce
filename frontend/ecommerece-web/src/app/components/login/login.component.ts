import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    // Simple hardcoded check for demonstration; replace with actual authentication logic
    if (this.username === 'admin' && this.password === 'admin') {
      this.authService.login({ role: 'admin' });
    } else if (this.username === 'user' && this.password === 'user') {
      this.authService.login({ role: 'user' });
    } else {
      // Handle login failure
      alert('Invalid credentials');
      return;
    }

    this.router.navigate(['/']);
  }
}
