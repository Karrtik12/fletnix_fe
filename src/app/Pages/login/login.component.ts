import { Component, inject } from '@angular/core';
import { LoginDetails, UserDetails } from '../../Models/cred';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoadingBarComponent } from "../../Elements/loading-bar/loading-bar.component";
import { Router } from '@angular/router';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, LoadingBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDetails: LoginDetails = { email: '', password: '' }
  loading: boolean = false;
  authService = inject(AuthService);

  constructor(
    private router: Router,
  ) { }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  tryLogin() {
    if (this.loginDetails.email !== '' && this.loginDetails.password !== "") {
      this.loading = true;
      this.authService.loginApi(this.loginDetails!).subscribe(userDetails => {
        this.authService.loggedInUser = userDetails;
        localStorage.setItem("loggedInUserEmail", this.authService.loggedInUser.email);
        localStorage.setItem("loggedInUserAge", this.authService.loggedInUser.age.toString());
        if (this.authService.loggedInUser!.email === '') {
          alert(this.authService.loggedInUser.message)
        }
        else {
          this.navigateToHome();
          alert("Logged in");
        }
      });
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    } else {
      alert("Enter valid details")
    }
  }
}
