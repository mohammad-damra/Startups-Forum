import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IStartup from 'src/app/models/startup.modal';
import { AlertsService } from 'src/app/services/alerts.service';
import { ISector } from '../sectors/sectors.component';
import { map, Subject, takeUntil } from 'rxjs';
import { StartupsService } from 'src/app/services/startups.service';

@Component({
  selector: 'app-sector-details',
  templateUrl: './sector-details.component.html',
  styleUrls: ['./sector-details.component.scss'],
})
export class SectorDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  startups: IStartup[] = [];
  sectors: ISector[] = [];
  currentSector!: any;
  currentStartup: IStartup[] = [];
  showSpinner: boolean = true;
  id = '';
  title = '';
  color = '';

  constructor(
    public route: ActivatedRoute,
    private _router: Router,
    private _alert: AlertsService,
    private _startups: StartupsService
  ) {}

  ngOnInit(): void {
    //subscribing to the params in the URL (refactor late into a service)
    this.routeParams();
    this.getSectors();
    this.getStartupBySector();
  }

  routeParams() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        if (params['id']) {
          this.id = params.id;
        }
      });
  }

  getSectors() {
    this.route.data
      .pipe(
        map((data) => {
          this.showSpinner = false;
          this.currentSector = data?.sectors.filter(
            (sector: ISector) => sector.sectorName === this.id
          );
          if (this.currentSector.length == 0) {
            this._alert.pageNotFound();
            this._router.navigateByUrl('/home');
          } else {
            this.title = this.currentSector[0].sectorName;
            this.color = this.currentSector[0].designColor;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  getStartupBySector() {
    this._startups
      .getAllStartups()
      .pipe(takeUntil(this.destroy$))
      .subscribe((startup) => {
        this.currentStartup = [];
        startup.forEach((s) => {
          if (Object.values(s.sectorName).includes(this.id)) {
            this.currentStartup.push(s);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
