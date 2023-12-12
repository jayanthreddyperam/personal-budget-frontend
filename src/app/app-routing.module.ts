import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from 'src/budget/budget.component';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { ExpenseComponent } from 'src/expense/expense.component';
import { HomeComponent } from 'src/home/home.component';
import { LoginComponent } from 'src/login/login.component';
import { SignupComponent } from 'src/signup/signup.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'budget', component: BudgetComponent },
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
