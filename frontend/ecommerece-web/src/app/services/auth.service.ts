import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private admin = new BehaviorSubject<boolean>(this.isAdmin());

  constructor(private router: Router) { }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.admin.asObservable();
  }

  login(user: { role: string }): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
    this.admin.next(user.role === 'admin');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.admin.next(false);
    this.router.navigate(['/']);
  }

  private isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  private isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role === 'admin';
  }
}
