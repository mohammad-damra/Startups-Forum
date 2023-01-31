import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SectorsService } from 'src/app/services/sectors.service';

export interface ISector {
  sectorName: string;
  sectorLogo: string;
  designColor: string;
  parentCategoryName: string;
}

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss'],
})
export class SectorsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  showSpinner: boolean = true;
  color = '';
  isAdmin!: any;
  sectors: ISector[] = [];
  hide = true;
  constructor(
    private _auth: AuthService,
    private _sectorsApi: SectorsService
  ) {}

  ngOnInit(): void {
    this.getAllSector();
  }

  getAllSector() {
    this._sectorsApi
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sectors) => {
          this.showSpinner = false;
          this.sectors = sectors;
          this.color;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
