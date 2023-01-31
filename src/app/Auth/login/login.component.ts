import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  showAlert = false;
  alertMessage = 'Logging in.';
  alertColor = 'gold';
  inSubmission = false;

  creadentials = {
    email: '',
    password: '',
  };

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.saveGoogleUsers();
  }

  login() {
    this.showAlert = true;
    this.alertMessage = 'Logging in. Please wait.';
    this.alertColor = 'gold';
    this.inSubmission = true;

    this._auth
      .login(this.creadentials.email, this.creadentials.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alertMessage = 'Successfully logged in!';
          this.alertColor = 'green';
          this.inSubmission = true;
        },
        error: (err) => {
          console.log('Error in logging in');
          this.inSubmission = false;
          this.alertMessage = 'Error occured.Please try again later.';
          this.alertColor = 'red';
          return;
        },
      });
  }

  saveGoogleUsers() {
    this._auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this._auth.saveGoogleUsers(user);
      }
    });
  }

  onGoogleLogin() {
    this._auth.LoginWithGoogle();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
