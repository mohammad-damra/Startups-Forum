import { Component, OnInit, OnDestroy } from '@angular/core';
import ISector from 'src/app/models/sectors.modal';
import IStartup from 'src/app/models/startup.modal';
import { SectorsService } from 'src/app/services/sectors.service';
import { StartupsService } from 'src/app/services/startups.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-startups-list',
  templateUrl: './startups-list.component.html',
  styleUrls: ['./startups-list.component.scss'],
})
export class StartupsListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  startups: IStartup[] = [];
  sectors: ISector[] = [];
  current: IStartup[] = [];

  constructor(
    private _startupsApi: StartupsService,
    private _sectorsApi: SectorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSectors();
    this.getApprovedStartups();
  }

  getSectors() {
    this._sectorsApi
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sectors) => (this.sectors = sectors),
      });
  }

  sectorValue($event: any) {
    console.log($event.value);
  }

  tabChanged($event: any) {
    if (this.sectors) {
      this.current = [];
      this.startups.forEach((startup) => {
        let sector_Name = Object.values(startup.sectorName);
        if (sector_Name.includes($event.tab.textLabel as never)) {
          this.current.push(startup);
          console.log(this.current);
        }
      });
    }
  }

  getApprovedStartups() {
    this._startupsApi
      .approvedStartups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (startups) => {
          this.startups = startups;
        },
      });
  }

  toStartupDetails(key: any) {
    this.router.navigateByUrl(`startups/startup-details/${key}`);
  }
  trackByName(index: number, startup: IStartup) {
    return startup.startupName;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
