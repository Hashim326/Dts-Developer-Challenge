import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private _snackBar = inject(MatSnackBar);
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }


  public checkPasswords(): void {
    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ missMatch: true });
      return;
    } else {
      if (this.confirmPassword?.errors) {
        const errors = { ...this.confirmPassword.errors };
        delete errors['missMatch'];
      }
    }

  }

  public onSubmit(): void {

    if (this.signupForm.valid) {
      console.log('Signup Form Data:', this.signupForm.value);

      this.authService.signUp(this.name?.value, this.email?.value, this.password?.value).subscribe({
        next: (res) => {
          if (res.success) {
            this._snackBar.open("Account successfully created.", "X");
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          if (err.status === 400) {
            this._snackBar.open(err.error, "X");
          }else{
            this._snackBar.open("There was an issue whilst creating your account. Please check the form and try again", "X");
          }


          console.log(err);
        }
      });
    }
  }
}
