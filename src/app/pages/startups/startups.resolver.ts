import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { StartupsService } from 'src/app/services/startups.service';

@Injectable({
  providedIn: 'root',
})
export class StartupsResolver implements Resolve<any> {
  constructor(
    private _startups: StartupsService,
    private router: Router,
    private _alert: AlertsService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._startups.getStartupById(route.params?.id).pipe(
      take(1),
      catchError((err) => {
        this._alert.pageNotFound();
        this.router.navigateByUrl('/home');
        return 'No Page';
      })
    );
  }
}
