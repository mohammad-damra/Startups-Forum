import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import ISector from 'src/app/models/sectors.modal';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-sectors-explore',
  templateUrl: './sectors-explore.component.html',
  styleUrls: ['./sectors-explore.component.scss'],
})
export class SectorsExploreComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  sectors!: any;
  showSpinner: boolean = true;

  constructor(private _sectorsApi: SectorsService, private router: Router) {}

  ngOnInit(): void {
    this.getSectors();
  }

  getSectors() {
    this._sectorsApi
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sectors: any) => {
          this.showSpinner = false;
          this.sectors = sectors;
        },
      });
  }

  toDetails(sectorName: string) {
    this.router.navigateByUrl(`sectors/sectorDetails/${sectorName}`);
  }

  trackByName(index: number, sector: ISector) {
    return sector.sectorName;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
