import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { StartupsService } from 'src/app/services/startups.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-startups-manage',
  templateUrl: './startups-manage.component.html',
  styleUrls: ['./startups-manage.component.scss'],
})
export class StartupsManageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private readonly destroy$ = new Subject<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: false })
  table!: MatTable<any>;
  isApproved: boolean = false;
  filterdStatups: any[] = [];
  displayedColumns: string[] = [
    'startupName',
    'startupCity',
    'sectorName',
    'yearOfEstablishment',
    'websiteURL',
    'action',
    'approval',
  ];

  startupsData: any[] = [];
  uniqueSectors: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  sectors: any;
  startup: any;
  descriptionVisibility: boolean = false;
  show!: boolean;

  constructor(
    private router: Router,
    private _startupsApi: StartupsService,
    private _sectorsApi: SectorsService,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.StartupsDataToTable();
    this.getSectors();
    this.BreakpointObserver();
  }

  BreakpointObserver() {
    this.breakpoint
      .observe('(max-width:800px)')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.show = false;
        if (res.matches) {
          this.show = true;
        }
      });
  }

  getSectors() {
    this._sectorsApi
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sectors) => {
          this.sectors = sectors;
        },
      });
  }

  StartupsDataToTable() {
    this.startupsData = [];
    this._startupsApi
      .getAllStartups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data.forEach((data) => {
            this.startupsData.push(data);
          });

          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource._updateChangeSubscription();
        },
      });
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  addStartupDia() {
    this.router.navigateByUrl('/startups/create-startup/');
  }

  onChange($event: any) {
    if ($event.value == 'all') {
      this.dataSource = new MatTableDataSource(this.startupsData);
    } else {
      const filterValue = $event.value;
      this.filterdStatups = [];
      this.startupsData.forEach((s) => {
        let sector_Name = Object.values(s.sectorName);
        if (sector_Name.includes(filterValue)) {
          this.filterdStatups.push(s);
        }
      });
      this.dataSource = new MatTableDataSource(this.filterdStatups);
    }
  }

  deleteStartup(key: string) {
    if (confirm('Are sure bro ?')) {
      this._startupsApi.delete(key);
    }
  }
  approve(id: any) {
    this._startupsApi
      .getStartupById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((startup: any) => {
        startup.isApproved = true;
        this.startup = startup;
        this._startupsApi.update(id, this.startup);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
