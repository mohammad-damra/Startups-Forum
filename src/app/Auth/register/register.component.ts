import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.modal';
import { RegisterValidators } from '../validators/register-validators';
import { UsedEmail } from '../validators/used-email';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  inSubmission = false;
  registerForm!: FormGroup;

  //alert
  showAlert = false;
  alertMessage = 'Your account is being created.';
  alertColor = 'gold';

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private usedEmail: UsedEmail
  ) {}

  // Using Reactive form

  ngOnInit(): void {
    this.signupForm();
  }

  signupForm() {
    this.registerForm = this.fb.group(
      {
        fname: ['', [Validators.required, Validators.minLength(2)]],
        lname: ['', [Validators.required, Validators.minLength(2)]],
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          [this.usedEmail.validate]
        ),
        age: [
          null,
          [Validators.required, Validators.min(18), Validators.max(120)],
        ],
        profession: ['', [Validators.required]],
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
          ),
        ]),
        confirm_password: new FormControl('', [Validators.required]),
        phoneNumber: [
          null,
          [
            Validators.required,
            Validators.minLength(13),
            Validators.maxLength(13),
          ],
        ],
      },
      {
        validator: RegisterValidators.ConfirmedValidator(
          'password',
          'confirm_password'
        ),
      }
    );
  }

  get fname() {
    return this.registerForm.get('fname') as FormControl;
  }
  get lname() {
    return this.registerForm.get('lname') as FormControl;
  }
  get email() {
    return this.registerForm.get('email') as FormControl;
  }
  get age() {
    return this.registerForm.get('age') as FormControl;
  }
  get profession() {
    return this.registerForm.get('profession') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  get confirm_password() {
    return this.registerForm.get('confirm_password') as FormControl;
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormControl;
  }

  //SignUp

  register() {
    this.showAlert = true;
    this.alertMessage = 'Your account is being created';
    this.alertColor = 'gold';
    this.inSubmission = true;

    this._auth
      .createUsers(this.registerForm.value as IUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alertMessage = 'Your account is successfully created.';
          this.alertColor = 'green';
          this._auth.createUsersData(
            res.user?.uid,
            this.registerForm.value as IUser
          );
        },
        error: (err) => {
          console.log(err);
          this.alertMessage = 'An error occured. Please try again later.';
          this.alertColor = 'red';
          this.inSubmission = false;
          return;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
