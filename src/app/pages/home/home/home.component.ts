import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StartupsService } from 'src/app/services/startups.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showSpinner: boolean = true;
  searchText: string = '';
  startups!: any;
  constructor(private _startups: StartupsService, private _router: Router) {}

  ngOnInit(): void {
    this.getStartups();
  }

  onSeatchTextRecieved(searchValue: string) {
    this.searchText = searchValue;
  }

  getStartups() {
    this._startups
      .getAllStartups()
      .subscribe((startups) => (this.startups = startups));
  }

  toStartupDetails(key: string) {
    this._router.navigateByUrl(`startups/startup-details/${key}`);
  }
}
