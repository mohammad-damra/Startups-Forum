import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import IMessage from 'src/app/models/messages.modal';

import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { StartupsService } from 'src/app/services/startups.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  usersLength: number | null = null;
  startupsLength: number | null = null;
  sectorsLength: number | null = null;
  usersData!: any;
  messagesData: IMessage[] = [];
  showSpinner: boolean = true;

  constructor(
    private _auth: AuthService,
    private _startups: StartupsService,
    private _sectors: SectorsService,
    private _contact: ContactService
  ) {}

  ngOnInit(): void {
    this.allUsers();
    this.allStartups();
    this.allSectors();
    this.allUsersData();
    this.getAllMessages();
  }

  allUsers() {
    this._auth
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => (this.usersLength = users.length));
  }

  allStartups() {
    this._startups
      .getAllStartups()
      .pipe(takeUntil(this.destroy$))
      .subscribe((startups) => (this.startupsLength = startups.length));
  }

  allSectors() {
    this._sectors
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe((sectors) => (this.sectorsLength = sectors.length));
  }

  allUsersData() {
    this._auth
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((usres) => {
        this.showSpinner = false;
        this.usersData = usres;
      });
  }

  getAllMessages() {
    this._contact
      .getAllMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages: any) => {
        this.messagesData = messages;
        //console.log(this.messagesData);
      });
  }

  deleteMessage(key: any) {
    this._contact.deleteMessageByKey(key);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
