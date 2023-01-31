import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from './initializer/users-data.service';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Startups';
  constructor(
    public _auth: AuthService,
    public _userData: UsersDataService,
    private route: ActivatedRoute,
    public lodaer: LoaderService
  ) {}
  ngOnInit(): void {
    console.log(this.route.outlet);
  }
}
