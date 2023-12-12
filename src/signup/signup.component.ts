import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  showLoginLink: boolean =false;
  message: any = '';

  constructor(private fb: FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.http.post("http://localhost:8080/credentials/signUp",this.signupForm.value).subscribe((data:any)=>{
    console.log(data);
    if(data.mssg === "User signedup"){
      this.showLoginLink = true;
    }
  },(error:any)=>{
    console.log("Error",error);
    this.message = error.error.mssg;
  })
  }
  onLogin(){
    this.router.navigate(['/login']);
  }
}
