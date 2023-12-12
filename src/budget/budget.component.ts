import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  heading = 'Budget Tracker';
  selectedMonth!: string;
  selectedYear!: number;
  category!: string;
  amount!: number;
  successmessage: any = '';
  errormessage: string ='';
  budgets: { category: string; amount: number }[] = [];

  months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
  ];

  years = Array.from({ length: 41 }, (_, index) => 2000 + index);

  constructor(private router:Router,private http:HttpClient) {}

  ngOnInit(): void {}

  addCategory() {
    if (this.category && this.amount) {
      this.budgets.push({ category: this.category, amount: this.amount });
      this.category = '';
      this.amount = 0;
    }
  }

  saveBudget() {
    // Implement save expense logic
    console.log('Expenses:', this.budgets);
    this.errormessage = '';
    this.successmessage = ''
    if(this.selectedMonth!==''&& this.selectedYear!==null){
      let Budgets = [];
      let budgetArray = {
        month:this.selectedMonth,
        year:this.selectedYear,
        Data:this.budgets
      }
      Budgets.push(budgetArray);
      let reqBody = {
        user:sessionStorage.getItem("userId"),
        Budgets:Budgets
      }
      console.log(reqBody);
      const headers = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('token')}`);
      this.http.post("http://localhost:8080/personBudget/addBudget",reqBody,{
        headers: headers,}).subscribe((data:any)=>{
        this.successmessage = data.mssg
      },(error: any)=>{
        if(error){
          this.errormessage = "Error while Saving the Budget"
        }
      })

    }
    else{
      this.errormessage = 'Please select the month and year to add the budget'
    }
  }
  onDashBoard(){
    this.router.navigate(['/dashboard']);
  }
  onLogout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
