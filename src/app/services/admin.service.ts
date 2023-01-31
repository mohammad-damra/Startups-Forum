import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AdminService implements CanLoad, CanActivate {
  constructor(private _auth: AuthService, private route: Router) {}
  canLoad(): Observable<boolean> {
    return this._auth.getCurrentUserDb().pipe(
      map((user) => {
        if (user) {
          if (user.isAdmin) {
            return true;
          } else {
            this.route.navigate(['/home']);
            return false;
          }
        } else {
          this.route.navigate(['/home']);
          return false;
        }
      })
    );
  }
  canActivate(): Observable<boolean> {
    return this._auth.getCurrentUserDb().pipe(
      map((user) => {
        if (user) {
          if (user.isAdmin) {
            return true;
          } else {
            this.route.navigate(['/home']);
            return false;
          }
        } else {
          this.route.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
