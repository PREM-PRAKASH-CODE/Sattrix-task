import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  userName: string = '';
  password: string = '';
  email: string = '';
  confirmPassword = '';
  isShowLogin = true;
  error = false;
  constructor(private router: Router) {}
  onTabChange() {
    this.isShowLogin = !this.isShowLogin;
    this.resetForm();
  }
  resetForm() {
    this.userName = '';
    this.password = '';
  }
  onSubmit() {
    if (this.userName && this.password) {
      let userFromStrorage: any;
      userFromStrorage = sessionStorage.getItem('user');
      if (userFromStrorage) {
        userFromStrorage = JSON.parse(userFromStrorage);
        if (
          this.userName == userFromStrorage.userName &&
          this.password == userFromStrorage.password
        ) {
          this.router.navigate(['/home']);
          sessionStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cC'
          );
          this.resetForm();
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      }
    }
  }
  onSubmitRegister() {
    if (this.userName && this.password && this.confirmPassword && this.email) {
      let user = {
        userName: this.userName,
        password: this.password,
        email: this.email,
      };

      sessionStorage.setItem('user', JSON.stringify(user));
      this.isShowLogin = true;
      this.resetForm();
    }
  }
}
