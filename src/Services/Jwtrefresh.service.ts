// authentication.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JWTrefreshService {
  constructor(private http:HttpClient){
    
  }
  private tokenExpirationTimeout: any;

  // Assume you have a method to get the token and set it in the service
  setToken(token: string): void {
    // Set the token in the service

    // Clear any existing timeout
    this.clearTokenExpirationTimeout();

    // Set a new timeout to show the popup after 50 seconds
    this.tokenExpirationTimeout = setTimeout(() => {
      this.showTokenExpiryPopup();
    }, 50000); // 50 seconds
  }

  private showTokenExpiryPopup(): void {
    // Logic to show the popup
    if(sessionStorage.getItem('token')){
      if(confirm("Your token will expire in 10s click ok to refresh the token.")){
        let reqBody = {
          userId:sessionStorage.getItem('userId')
        };
        this.http.post("http://localhost:8080/credentials/jwt",reqBody).subscribe((data:any)=>{
          sessionStorage.setItem('token',data.jwtToken);
          this.setToken(data.token);
        })
      }
    }
  }

  private clearTokenExpirationTimeout(): void {
    // Clear the existing timeout if it exists
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
  }
}
