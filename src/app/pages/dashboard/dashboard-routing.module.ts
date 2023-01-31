import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { AdminService } from 'src/app/services/admin.service';
import { SectorsManageComponent } from './sectors-manage/sectors-manage.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { StartupsManageComponent } from './startups-manage/startups-manage.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/home');
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      {
        path: '',
        component: DashboardOverviewComponent,
      },
      {
        path: 'sectors-manage',
        component: SectorsManageComponent,
      },
      {
        path: 'dashboard-overview',
        component: DashboardOverviewComponent,
      },
      {
        path: 'startups-manage',
        component: StartupsManageComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
