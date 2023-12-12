import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset, Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedMonth!: string;
  selectedYear!: number;
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
  years = Array.from({length: 41}, (_, index) => 2000 + index);
  budgetData: any;
  expenseData: any;
  showMessage: boolean = false;
  message: string='';
  Chart1: any;
  Chart2: any;
  Chart3:any;
  chart1Data: any = [];
  chart2Data: any = [];
  chart1: any = [];
  chart1Labels: any = [];
  chart1total: any = 0;
  chart2: any = [];
  chart2Labels: any = [];
  chart2total: any = 0;

  constructor(private route:Router, private http:HttpClient,private router:Router) {}

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('token')}`);
    this.http.get(`http://localhost:8080/personBudget/getBudget/${sessionStorage.getItem("userId")}`, {
      headers: headers,}).subscribe((data:any)=>{
      this.budgetData = data.data;
      this.http.get(`http://localhost:8080/personExpense/getExpense/${sessionStorage.getItem("userId")}`, {
        headers: headers,}).subscribe((data:any)=>{
      this.expenseData = data.data;
      if(this.budgetData!==null && this.expenseData!==null){
        this.showChartsData();
      }
      else{
        this.showMessage = true;
      }
    });
    });
  }
  showChartsData() {
    console.log(this.selectedMonth);
    this.chart1total = 0;
    this.chart2total = 0;
    this.chart1 = this.expenseData.Expenses.filter((item: any )=>item.year==this.selectedYear&&item.month===this.selectedMonth
    );
    console.log(this.chart1);
    this.chart1Labels = this.chart1.flatMap((data:any)=>data.Data.map((items:any)=>{
      return items.category;    
    }))
    console.log(this.chart1Labels);
    this.chart1Data = this.chart1.flatMap((data:any)=>data.Data.map((items:any)=>{
      return items.amount;
    }))
    console.log(this.chart1Data);
   this.chart1Data.forEach((element: any) => {
      console.log(element)
      this.chart1total = this.chart1total + Number(element);
     });
     console.log(this.chart1total);
     this.chart2 = this.budgetData.Budgets.filter((item: any )=>item.year==this.selectedYear&&item.month===this.selectedMonth
    );
    console.log(this.chart2);
    this.chart2Labels = this.chart2.flatMap((data:any)=>data.Data.map((items:any)=>{
      return items.category;    
    }))
    console.log(this.chart2Labels);
    this.chart2Data = this.chart2.flatMap((data:any)=>data.Data.map((items:any)=>{
      return items.amount;
    }))
    console.log(this.chart2Data);
   this.chart2Data.forEach((element: any) => {
      console.log(element)
      this.chart2total = this.chart2total + Number(element);
     });
     console.log(this.chart2total);
    if (this.chart1Labels.length > 0 && this.chart1Data.length > 0) {
      this.createPieChart();
      this.createBarChart();
      this.createLineChart();
      this.message = ''
    }
    else{
      this.message = "Please select valid month and year"
    }
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (this.Chart1) {
      this.Chart1.destroy();
    }
    this.Chart1 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Expense', 'Budget'],
        datasets: [{
          label: 'Amount',
          data: [this.chart1total,this.chart2total],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
      }
    });
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (this.Chart2) {
      this.Chart2.destroy();
    }
    const randomColor = () => {
      // Generate a random hex color
      return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    };
    const chart1Colors = Array.from({ length: this.chart1Data.length }, () => randomColor());
    this.Chart2 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chart1Labels,
        datasets: [{
          label: 'Amount',
          data: this.chart1Data, // Example data
          backgroundColor: chart1Colors,
          borderColor: chart1Colors,
          borderWidth: 1
        }]
      }
    });
  }

  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    if (this.Chart3) {
      this.Chart3.destroy();
    }
    const randomColor = () => {
      // Generate a random hex color
      return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    };
    const chart2Colors = Array.from({ length: this.chart2Data.length }, () => randomColor());
    this.Chart3 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chart2Labels,
        datasets: [{
          label: 'Amount',
          data: this.chart2Data, // Example data
          backgroundColor: chart2Colors,
          borderColor: chart2Colors,
          borderWidth: 1
        }]
      }
    });
  }

  enterBudget() {
    console.log('Entering budget for', this.selectedMonth, this.selectedYear);
  }

  enterExpense() {
    console.log('Entering expense for', this.selectedMonth, this.selectedYear);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
