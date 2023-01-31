import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectorDetailsComponent } from './sector-details/sector-details.component';
import { SectorsComponent } from './sectors/sectors.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { ModalService } from 'src/app/services/modal.service';
import { SectorsResolverResolver } from './sectors-resolver.resolver';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/home');

const routes: Routes = [
  {
    path: '',
    component: SectorsComponent,
  },
  {
    path: 'sectors',
    component: SectorsComponent,
  },
  {
    path: 'sectorDetails/:id',
    component: SectorDetailsComponent,
    resolve: {
      sectors: SectorsResolverResolver,
    },
  },
  {
    path: 'sector-details',
    redirectTo: 'sectors',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsRoutingModule {
  constructor(private modal: ModalService) {}
}
