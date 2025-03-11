import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../services/auth.service';
import { catchError, finalize, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  constructor(private router: Router) {}
  hide = true;
  loading = false;
  private _snackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onEditClick() {
    alert('Edit icon clicked!');
    // Add your custom logic here
  }

  onSubmit() {
    this.loading = true;

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData);

      this.authService
        .login(formData)
        .pipe(
          catchError((err) => {
            console.log(err);
            let errorMessage = 'Something Went Wrong';
            if (err.error && err.error.message) {
              errorMessage = err.error.message;
            } else if (err.message) {
              errorMessage = err.message;
            }
            this._snackBar.open(errorMessage, 'close');
            return throwError(() => new Error(errorMessage));
          }),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((authResponse: AuthResponse) => {
          if (authResponse?.principal?.roles?.includes('ADMIN')) {
            localStorage.setItem('authToken', JSON.stringify(authResponse));
            this.router.navigate(['/app_layout/employees']);
          } else if (authResponse?.principal?.roles?.includes('EMPLOYEE')) {
            localStorage.setItem('authToken', JSON.stringify(authResponse));
            this.router.navigate(['/app_layout/my_rewards']);
          } else {
            this._snackBar.open('Invalid User Account', 'close');
          }
        });
    }
  }
}
