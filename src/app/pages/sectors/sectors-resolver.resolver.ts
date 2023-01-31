import { Injectable, OnDestroy } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { ISector } from './sectors/sectors.component';

@Injectable({
  providedIn: 'root',
})
export class SectorsResolverResolver implements Resolve<ISector>, OnDestroy {
  constructor(
    private _sectors: SectorsService,
    private router: Router,
    private _alert: AlertsService
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._sectors.getAllSectores().pipe(map((sectors) => sectors));
  }
}
