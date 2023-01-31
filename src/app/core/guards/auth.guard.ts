import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { UsersDataService } from 'src/app/initializer/users-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalService } from 'src/app/services/modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  isLogged: boolean = true;
  constructor(
    private _userData: UsersDataService,
    private router: Router,
    private _modal: ModalService,
    private _loader: LoaderService,
    private _auth: AuthService
  ) {}
  canLoad(): boolean {
    if (this._auth.isLogged.value) {
      return true;
    } else {
      this._modal.toggleModal('RegisterForm');
      return false;
    }
  }
}
