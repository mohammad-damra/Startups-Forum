import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersDataService } from 'src/app/initializer/users-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanLoad {
  constructor(private _userService: UsersDataService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isLoggedIn = this._userService.isAuthenticated$;
    if (!isLoggedIn) {
      return true;
    }
    return false;
  }
}
