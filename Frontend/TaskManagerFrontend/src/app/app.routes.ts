import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TasksComponent } from './tasks/tasks.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "tasks", component: TasksComponent, canActivate:[authGuard] }
];

