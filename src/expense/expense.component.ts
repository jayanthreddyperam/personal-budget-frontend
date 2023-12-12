import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  heading = 'Expense Tracker';
  selectedMonth!: string;
  selectedYear!: number;
  category!: string;
  amount!: number;
  expenses: { category: string; amount: number }[] = [];
  successmessage: any = '';
  errormessage: string ='';

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

  constructor(private router: Router,private http:HttpClient) {}

  ngOnInit(): void {}

  addCategory() {
    if (this.category && this.amount) {
      this.expenses.push({ category: this.category, amount: this.amount });
      this.category = '';
      this.amount = 0;
    }
  }

  saveExpense() {
    // Implement save expense logic
    console.log('Expenses:', this.expenses);
    this.successmessage='';
    this.errormessage = ''
    if(this.selectedMonth!==''&& this.selectedYear!==null){
      let Expenses = [];
      let expenseArray = {
        month:this.selectedMonth,
        year:this.selectedYear,
        Data:this.expenses
      }
      Expenses.push(expenseArray);
      let reqBody = {
        user:sessionStorage.getItem("userId"),
        Expenses:Expenses
      }
      console.log(reqBody);
      const headers = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('token')}`);
      this.http.post("http://localhost:8080/personExpense/addExpense",reqBody,{
        headers: headers,}).subscribe((data:any)=>{
        this.successmessage = data.mssg
      },(error: any)=>{
        if(error){
          this.errormessage = "Error while Saving the Expense"
        }
      })

    }
    else{
      this.errormessage = 'Please select the month and year to add the expense'
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
