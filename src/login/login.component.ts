import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JWTrefreshService } from 'src/Services/Jwtrefresh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  message: any = '';

  constructor(private fb: FormBuilder,private http:HttpClient,private router:Router,private service:JWTrefreshService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Implement your login logic here
      console.log('Form submitted:', this.loginForm.value);
      this.http.post("http://localhost:8080/credentials/login",this.loginForm.value).subscribe((data:any)=>{
    console.log(data);
    if(data.mssg === "User Found!!"){
      sessionStorage.setItem('token',data.jwtToken);
      sessionStorage.setItem('userId',data.userId);
      this.service.setToken(data.jwtToken);
      this.router.navigate(['/dashboard']);
      
    }
  },(error)=>{
    console.log("Error",error);
    this.message = error.error.mssg;
  })
    }
  }

}
