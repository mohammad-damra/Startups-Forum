import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from 'src/app/initializer/users-data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  constructor(
    private _modal: ModalService,
    private _userData: UsersDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  newStartupBtn() {
    if (this._userData.isAuthenticated$) {
      this.router.navigate(['/startups/create-startup']);
    } else {
      this._modal.toggleModal('RegisterForm');
    }
  }
}
