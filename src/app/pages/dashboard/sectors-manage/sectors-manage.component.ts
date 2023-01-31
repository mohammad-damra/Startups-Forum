import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddSectorComponent } from '../add-sector/add-sector.component';

import { SectorsService } from 'src/app/services/sectors.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import ISector from 'src/app/models/sectors.modal';

@Component({
  selector: 'app-sectors-manage',
  templateUrl: './sectors-manage.component.html',
  styleUrls: ['./sectors-manage.component.scss'],
})
export class SectorsManageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'sectorName',
    'designColor',
    'sectorLogo',
    'parentCategoryName',
    'action',
  ];
  private readonly destroy$ = new Subject<void>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: false })
  table!: MatTable<any>;

  dataSource = new MatTableDataSource<ISector>();
  show!: boolean;
  showSpinner: boolean = true;

  constructor(
    private _sectorsDialog: MatDialog,
    private _sectorsApi: SectorsService,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getAllSectors();
    this.breakPoint();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
  }

  getAllSectors() {
    this._sectorsApi
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.showSpinner = false;
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource._updateChangeSubscription();
        },
      });
  }

  breakPoint() {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addSector() {
    this._sectorsDialog.open(AddSectorComponent, {
      width: '600px',
    });
  }

  editSector(element: any) {
    this._sectorsDialog.open(AddSectorComponent, {
      width: '600px',
      data: { id: element.key },
    });
  }

  deleteSector(key: string) {
    if (confirm('Are sure bro ?')) {
      this._sectorsApi.delete(key);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
