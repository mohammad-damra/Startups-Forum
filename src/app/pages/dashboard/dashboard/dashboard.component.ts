import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  testo: boolean = false;
  constructor() {}
  ngOnInit(): void {}

  toggler($event: any) {
    this.testo = !$event;
  }
}
