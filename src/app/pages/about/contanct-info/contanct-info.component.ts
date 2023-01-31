import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersDataService } from 'src/app/initializer/users-data.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contanct-info',
  templateUrl: './contanct-info.component.html',
  styleUrls: ['./contanct-info.component.scss'],
})
export class ContanctInfoComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _contact: ContactService,
    private _alert: AlertsService,
    private _router: Router,
    public _userData: UsersDataService
  ) {}

  ngOnInit(): void {
    this.contactFormArea();
  }

  contactFormArea() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  get name() {
    return this.contactForm.get('name') as FormControl;
  }
  get email() {
    return this.contactForm.get('email') as FormControl;
  }
  get subject() {
    return this.contactForm.get('subject') as FormControl;
  }
  get message() {
    return this.contactForm.get('message') as FormControl;
  }

  onContactSubmit() {
    this._contact
      .addMessage(this.contactForm.value)
      .then(() => {
        this._alert.SuccessAlertMessage();
      })
      .finally(() => {
        this._router.navigateByUrl('/home');
      });
  }
}
