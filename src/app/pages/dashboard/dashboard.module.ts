import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { SectorsManageComponent } from './sectors-manage/sectors-manage.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddSectorComponent } from './add-sector/add-sector.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { StartupsManageComponent } from './startups-manage/startups-manage.component';

const MatData = [
  MatTableModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
];
@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    SectorsManageComponent,
    DashboardOverviewComponent,
    AddSectorComponent,
    StartupsManageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ...MatData,
    AngularFireStorageModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [AddSectorComponent],
})
export class DashboardModule {}
