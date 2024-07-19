import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarComponent } from '../../Elements/loading-bar/loading-bar.component';
import { LoginDetails, RegistrationDetails } from '../../Models/cred';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, LoadingBarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationDetails: RegistrationDetails = { email: '', age: undefined, password: '' }
  loading: boolean = false;
  authService = inject(AuthService);

  constructor(
    private router: Router,
  ) { }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  validateEmail = (email: string) => {
    let regex = new RegExp(/\S+@\S+\.\S+/);
    return regex.test(email);
  };

  tryRegistering() {
    if (!this.validateEmail(this.registrationDetails.email) || this.registrationDetails.email === '' || this.registrationDetails.email === undefined || this.registrationDetails.email === null) {
      alert("Enter a valid email address");
      return;
    }
    if (this.registrationDetails.password === '' || this.registrationDetails.password === undefined || this.registrationDetails.password === null) {
      alert("Enter a valid password");
      return;
    }
    if (this.registrationDetails.age === 0 || this.registrationDetails.age === undefined || this.registrationDetails.age === null) {
      alert("Enter a valid age");
      return;
    }
    this.loading = true;
    this.authService.registerApi(this.registrationDetails!).subscribe(
      registrationResponse => {
        if (registrationResponse.created) {
          this.authService.loggedInUser.email = this.registrationDetails.email;
          this.authService.loggedInUser.age = this.registrationDetails.age!;
          localStorage.setItem("loggedInUserEmail", this.authService.loggedInUser.email);
          localStorage.setItem("loggedInUserAge", this.authService.loggedInUser.age.toString());
          this.navigateToHome();
          alert("Registered successfully");
        } else {
          alert(registrationResponse.message);
        }
      }
    );
    setTimeout(() => {
      this.loading = false;
    }, 2000);

  }
}
