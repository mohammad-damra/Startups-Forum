import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public _modal: ModalService, public _auth: AuthService) {}
  websiteUrl: string = 'https://neue-welt-d499e.web.app';
  ngOnInit(): void {}

  openModal($event: Event, id: string) {
    $event.preventDefault();
    this._modal.toggleModal(id);
  }
}
