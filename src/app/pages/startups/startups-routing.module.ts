import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupsComponent } from './startups/startups.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { AdminService } from 'src/app/services/admin.service';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
import { StartupsResolver } from './startups.resolver';
import { AddStartupComponent } from './add-startup/add-startup.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/home');

const routes: Routes = [
  {
    path: '',
    component: StartupsComponent,
  },
  {
    path: 'startups',
    component: StartupsComponent,
  },
  {
    path: 'add-startup',
    component: AddStartupComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'startup-details/:id',
    component: StartupDetailsComponent,
    resolve: {
      startups: StartupsResolver,
    },
  },
  {
    path: 'add-startup/:id',
    component: AddStartupComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome,
    },
    canActivate: [AngularFireAuthGuard, AdminService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupsRoutingModule {}
