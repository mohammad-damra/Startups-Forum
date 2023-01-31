import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  constructor(public _modal: ModalService) {}

  ngOnInit(): void {
    this._modal.register('LoginForm');
    this._modal.register('RegisterForm');
  }

  //Destroying the modal
  ngOnDestroy() {
    this._modal.unregister('LoginForm');
    this._modal.unregister('RegisterForm');
  }
}
