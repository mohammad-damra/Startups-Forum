import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IStartup from 'src/app/models/startup.modal';
import { delay, map, Subject, takeUntil } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-startup-details',
  templateUrl: './startup-details.component.html',
  styleUrls: ['./startup-details.component.scss'],
})
export class StartupDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  id = '';
  start: IStartup | undefined;
  undefiend: any;
  //showSpinner: boolean = true;
  constructor(
    public route: ActivatedRoute,
    private _alert: AlertsService,
    private _router: Router,
    private _loader: LoaderService
  ) {}

  ngOnInit(): void {
    //subscribing to the params in the URL
    this.getParamsID();
    this.getStartupByID(this.id);
  }

  getParamsID() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        if (params['id']) {
          this.id = params.id;
        }
      });
  }

  getStartupByID(id: string) {
    this.route.data //
      .pipe(
        map((data) => {
          this._loader.setLoading(true);
          return (this.start = data?.startups);
        }),
        delay(2000),
        takeUntil(this.destroy$)
      )
      .subscribe((s) => {
        this._loader.setLoading(false);
        if (!s) {
          this._alert.pageNotFound();
          this._router.navigateByUrl('/home');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
